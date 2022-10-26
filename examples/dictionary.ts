export function defaultToString(item: any): string {
  if (item === null)
    return 'NULL'

  else if (item === undefined)
    return 'UNDEFINED'

  else if (typeof item === 'string' || item instanceof String)
    return `${item}`

  return item.toString()
}

export class ValuePair<K, V> {
  constructor(public key: K, public value: V) {}

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

export class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> }

  constructor(private toStrFn: (key: K) => string = defaultToString) {
    this.table = {}
  }

  hasKey(key: K) {
    return this.table[this.toStrFn(key)] != null
  }

  set(key: K, value: V) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }

    return false
  }

  remove(key: K) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }

    return false
  }

  get(key: K) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  keyValues() {
    return Object.values(this.table)
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value)
  }

  forEach(cb: (key: K, value: V) => any) {
    const valuePairs = this.keyValues()

    for (let i = 0; i < valuePairs.length; i++) {
      const result = cb(valuePairs[i].key, valuePairs[i].value)
      if (result === false)
        break
    }
  }

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty())
      return ''

    const valuePairs = this.keyValues()

    let objString = `${valuePairs[0].toString()}`

    for (let i = 0; i < valuePairs.length; i++)
      objString = `${objString}, ${valuePairs[i].toString()}`

    return objString
  }
}
