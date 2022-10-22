// 节点元素 node
export class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}

export type IEqualsFunction<T> = (a: T, b: T) => boolean

export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}

export class LinkdeList<T> {
  // 长度统计
  protected count = 0
  // 头指针
  protected head: Node<T> | undefined

  // equalsFn是自己定义的判断两个元素是否相等的方法（因为元素的类型是变化的，所以判断相等的方法需要自己编写）
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {}

  // 链表尾部添加元素
  push(ele: T) {
    const node = new Node(ele)

    let current

    // 链表为空的时候
    if (this.head == null) {
      this.head = node
    }
    else {
      current = this.head

      while (current.next)
        current = current.next

      current.next = node
    }

    this.count++
  }

  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      let node = this.head

      for (let i = 0; i < index && node != null; i++)
        node = node.next

      return node
    }

    return undefined
  }

  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      // 移除第一项（注意头指针只会在移除第一项的时候发生变化，指向下一个节点）
      if (index === 0) { this.head = current?.next }
      else {
        // 获取当前索引的前一个索引元素
        const previous = this.getElementAt(index - 1)
        // 当前指向previous的下一个
        current = previous?.next
        // 切除中间的元素
        previous!.next = current?.next
      }

      // 计数减一并返回当前元素
      this.count--
      return current?.element
    }

    // 不合法时返回undefined
    return undefined
  }

  insert(ele: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(ele)

      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      }
      else {
        const previous = this.getElementAt(index - 1)
        const current = previous?.next
        node.next = current
        previous!.next = node
      }

      this.count++
      return true
    }

    return false
  }

  indexOf(ele: T) {
    let current = this.head

    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(ele, current.element))
        return i

      current = current.next
    }

    return -1
  }

  remove(ele: T) {
    const index = this.indexOf(ele)
    return this.removeAt(index)
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.size() === 0
  }

  getHead() {
    return this.head
  }

  clear() {
    this.head = undefined
    this.count = 0
  }

  toString() {
    if (this.head == null)
      return ''

    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}
