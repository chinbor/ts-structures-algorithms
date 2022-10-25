export class Set {
  private items: Record<PropertyKey, PropertyKey>

  constructor() {
    this.items = {}
  }

  has(ele: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(this.items, ele)
  }

  add(ele: PropertyKey) {
    if (!this.has(ele)) {
      this.items[ele] = ele
      return true
    }

    return false
  }

  delete(ele: PropertyKey) {
    if (this.has(ele)) {
      delete this.items[ele]
      return true
    }

    return false
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length
  }

  values() {
    return Object.values<PropertyKey>(this.items)
  }

  isEmpty() {
    return this.size() === 0
  }

  toString() {
    if (this.isEmpty())
      return ''

    const values = this.values()

    let objString = `${String(values[0])}`
    for (let i = 1; i < values.length; i++)
      objString = `${objString},${values[i].toString()}`

    return objString
  }

  union(otherSet: Set) {
    const unionSet = new Set()

    this.values().forEach(val => unionSet.add(val))
    otherSet.values().forEach(val => unionSet.add(val))

    return unionSet
  }

  intersection(otherSet: Set) {
    const intersectionSet = new Set()

    const values = this.values()
    const otherValues = otherSet.values()

    // 1. 找出元素最少的集合
    let biggerSet = values
    let smallerSet = otherValues

    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues
      smallerSet = values
    }

    // 2. 直接遍历最少的集合，循环次数减少
    smallerSet.forEach((val) => {
      if (biggerSet.includes(val))
        intersectionSet.add(val)
    })

    return intersectionSet
  }

  difference(otherSet: Set) {
    const differenceSet = new Set()

    this.values().forEach((val) => {
      if (!otherSet.has(val))
        differenceSet.add(val)
    })

    return differenceSet
  }

  isSubsetOf(otherSet: Set) {
    if (this.size() > otherSet.size())
      return false

    let isSubset = true

    // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
    this.values().every((val) => {
      if (!otherSet.has(val)) {
        isSubset = false
        return false
      }

      return true
    })

    return isSubset
  }
}
