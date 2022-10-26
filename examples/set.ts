import { defaultToString } from './dictionary'

export class Set<T> {
  private items: { [key: string]: T }

  constructor(private toStrFn: (key: T) => string = defaultToString) {
    this.items = {}
  }

  has(ele: T) {
    const key = this.toStrFn(ele)
    return Object.prototype.hasOwnProperty.call(this.items, key)
  }

  add(ele: T) {
    if (!this.has(ele)) {
      const key = this.toStrFn(ele)

      this.items[key] = ele
      return true
    }

    return false
  }

  delete(ele: T) {
    if (this.has(ele)) {
      const key = this.toStrFn(ele)

      delete this.items[key]
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
    return Object.values(this.items)
  }

  isEmpty() {
    return this.size() === 0
  }

  // 注意！！！，一定要是能够字符串化的对象（也就是实现了 toString 方法）
  toString() {
    if (this.isEmpty())
      return ''

    const values = this.values()

    let objString = `${String(values[0])}`
    for (let i = 1; i < values.length; i++)
      objString = `${objString},${String(values[i])}`

    return objString
  }

  union(otherSet: Set<T>) {
    const unionSet = new Set<T>()

    this.values().forEach(val => unionSet.add(val))
    otherSet.values().forEach(val => unionSet.add(val))

    return unionSet
  }

  intersection(otherSet: Set<T>) {
    const intersectionSet = new Set<T>()

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

  difference(otherSet: Set<T>) {
    const differenceSet = new Set<T>()

    this.values().forEach((val) => {
      if (!otherSet.has(val))
        differenceSet.add(val)
    })

    return differenceSet
  }

  isSubsetOf(otherSet: Set<T>) {
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
