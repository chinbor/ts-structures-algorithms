import type { IEqualsFunction } from './linkedList'
import { LinkdeList, Node, defaultEquals } from './linkedList'

export class DoublyNode<T> extends Node<T> {
  constructor(
    public element: T,
    public next?: DoublyNode<T>,
    public prev?: DoublyNode<T>,
  ) {
    super(element, next)
  }
}

export class DoublyLinkedList<T> extends LinkdeList<T> {
  protected head: DoublyNode<T> | undefined
  protected tail: DoublyNode<T> | undefined

  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn)
  }

  push(ele: T) {
    const node = new DoublyNode(ele)

    // 为空链表
    if (this.head == null) {
      this.head = node
      this.tail = node
    }
    else {
      this.tail!.next = node
      node.prev = this.tail
      this.tail = node
    }

    this.count++
  }

  insert(ele: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(ele)

      let current = this.head

      // 尾 HEAD <-> B
      if (index === 0) {
        if (this.head == null) {
          this.head = node
          this.tail = node
        }
        else {
          node.next = current
          current!.prev = node
          this.head = node
        }
      }
      // 尾 B <-> TAIL
      else if (index === this.count) {
        current = this.tail
        current!.next = node
        node.prev = current
        this.tail = node
      }
      // 中间 A <-> B <-> C
      else {
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        node.next = current
        previous!.next = node
        current!.prev = node
        node.prev = previous
      }

      this.count++
      return true
    }

    return false
  }

  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      // 头
      if (index === 0) {
        this.head = this.head?.next

        if (this.count === 1)
          this.tail = undefined

        else
          this.head!.prev = undefined
      }
      // 尾
      else if (index === this.count - 1) {
        current = this.tail
        this.tail = current?.prev
        this.tail!.next = undefined
      }
      // 中间
      else {
        current = this.getElementAt(index)
        const previous = current?.prev
        previous!.next = current?.next
        current!.next!.prev = previous
      }

      this.count--
      return current!.element
    }

    return undefined
  }

  indexOf(ele: T) {
    let current = this.head
    let index = 0

    while (current) {
      if (this.equalsFn(ele, current.element))
        return index
      index++
      current = current.next
    }

    return -1
  }

  getHead() {
    return this.head
  }

  getTail() {
    return this.tail
  }

  clear() {
    super.clear()
    this.tail = undefined
  }

  toString() {
    if (this.head == null)
      return ''

    let objString = `${this.head.element}`
    let current = this.head.next
    while (current != null) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }

  inverseToString() {
    if (this.tail == null)
      return ''

    let objString = `${this.tail.element}`
    let previous = this.tail.prev
    while (previous != null) {
      objString = `${objString},${previous.element}`
      previous = previous.prev
    }
    return objString
  }
}
