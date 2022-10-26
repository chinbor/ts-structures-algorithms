import { ValuePair, defaultToString } from './dictionary'

// NOTE: 会存在hash冲突！！（因为生成hashCode的方法是依据字符ascii编码累加除去37取余数，所以后者会覆盖前者）
export default class HashTable<K, V> {
  protected table: { [key: string]: ValuePair<K, V> }

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = {}
  }

  private loseloseHashCode(key: K) {
    if (typeof key === 'number')
      return key

    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++)
      hash += tableKey.charCodeAt(i)

    return hash % 37
  }

  hashCode(key: K) {
    return this.loseloseHashCode(key)
  }

  put(key: K, value: V) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key: K) {
    const valuePair = this.table[this.hashCode(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  remove(key: K) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair != null) {
      delete this.table[hash]
      return true
    }
    return false
  }

  getTable() {
    return this.table
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty())
      return ''

    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++)
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`

    return objString
  }
}
