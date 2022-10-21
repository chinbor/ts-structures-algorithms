export class Queue<T = any> {
  private count: number
  private lowestCount: number
  private items: Record<number, any>

  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  enqueue(element: T) {
    this.items[this.count] = element
    this.count++
  }

  dequeue() {
    if (this.isEmpty())
      return undefined

    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  peek() {
    if (this.isEmpty())
      return undefined

    return this.items[this.lowestCount]
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  size() {
    return this.count - this.lowestCount
  }

  toString() {
    if (this.isEmpty())
      return ''

    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++)
      objString = `${objString},${this.items[i]}`

    return objString
  }
}

export class Deque<T = any> {
  private count: number
  private lowestCount: number
  private items: Record<number, any>

  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  addFront(element: T) {
    if (this.isEmpty()) {
      this.addBack(element)
    }
    else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    }
    else {
      for (let i = this.count; i > 0; i--)
        this.items[i] = this.items[i - 1]

      this.count++
      this.items[0] = element
    }
  }

  addBack(element: T) {
    this.items[this.count] = element
    this.count++
  }

  removeFront() {
    if (this.isEmpty())
      return undefined

    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  removeBack() {
    if (this.isEmpty())
      return undefined

    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peekFront() {
    if (this.isEmpty())
      return undefined

    return this.items[this.lowestCount]
  }

  peekBack() {
    if (this.isEmpty())
      return undefined

    return this.items[this.count - 1]
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  size() {
    return this.count - this.lowestCount
  }

  toString() {
    if (this.isEmpty())
      return ''

    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++)
      objString = `${objString},${this.items[i]}`

    return objString
  }
}

export function hotPotato(elementsList: any[], num: number) {
  const queue = new Queue<any>()
  const eliminatedList: string[] = []

  for (const ele of elementsList)
    queue.enqueue(ele)

  // 仅剩一人停止
  while (queue.size() > 1) {
    // 移动位置num次（转圈）
    for (let i = 0; i < num; i++)
      queue.enqueue(queue.dequeue())

    // 停止后淘汰的人
    eliminatedList.push(queue.dequeue())
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue(),
  }
}

export function palindromeChecker(aString: string) {
  if (aString === undefined || aString === null || (aString !== null && aString.length === 0))
    return false

  const deque = new Deque<string>()
  // 全部转换为小写并去除空格
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let firstChar: string, lastChar: string

  for (let i = 0; i < lowerString.length; i++)
    deque.addBack(lowerString.charAt(i))

  while (deque.size() > 1) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar)
      return false
  }

  return true
}
