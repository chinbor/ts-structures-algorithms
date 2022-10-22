import type { IEqualsFunction } from './linkedList'
import { LinkdeList, Node, defaultEquals } from './linkedList'

export class CircularLinkedList<T> extends LinkdeList<T> {
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn)
  }

  push(ele: T) {
    const node = new Node(ele)
    let current

    if (this.head == null) {
      this.head = node
    }
    else {
      current = this.getElementAt(this.size() - 1)
      current!.next = node
    }

    node.next = this.head
    this.count++
  }

  insert(ele: T, index: number): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new Node(ele)
      let current = this.head

      // 头部插入
      if (index === 0) {
        // 空的链表
        if (this.head == null) {
          this.head = node
          node.next = this.head
        }
        // 非空链表
        else {
          node.next = current
          // 最后一个节点
          current = this.getElementAt(this.size() - 1)
          this.head = node
          current!.next = this.head
        }
      }
      // 其余位置插入
      else {
        const previous = this.getElementAt(index - 1)
        node.next = previous?.next
        previous!.next = node
      }

      this.count++
      return true
    }

    return false
  }

  removeAt(index: number): T | undefined {
    if (index >= 0 && index < this.count) {
      let current = this.head

      // 删除第一个元素
      if (index === 0) {
        // 仅仅存在一个元素
        if (this.size() === 1) {
          this.head = undefined
        }
        else {
          const removed = this.head
          current = this.getElementAt(this.size() - 1)
          this.head = this.head?.next
          current!.next = this.head
          current = removed
        }
      }
      // 删除其余位置的元素
      else {
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        previous!.next = current?.next
      }

      this.count--
      return current?.element
    }

    return undefined
  }
}
