import type { ICompareFunction } from './sortedLinkedList'
import { Compare, defaultCompare } from './sortedLinkedList'

export class Node<K> {
  constructor(public key: K, public left: Node<K> | null = null, public right: Node<K> | null = null) {}

  toString() {
    return `${this.key}`
  }
}

export class BinarySearchTree<T> {
  protected root: Node<T> | null = null

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

  insert(key: T) {
    if (this.root == null)
      this.root = new Node(key)
    else
      this.insertNode(this.root, key)
  }

  protected insertNode(node: Node<T>, key: T) {
    // 小于插入左侧
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null)
        node.left = new Node(key)

      else
        this.insertNode(node.left, key)
    }
    // 大于或等于插入右侧（但是等于这个情况不合理）
    else {
      if (node.right == null)
        node.right = new Node(key)

      else
        this.insertNode(node.right, key)
    }
  }

  inOrderTraverse(cb: Function) {
    this.inOrderTraverseNode(this.root, cb)
  }

  private inOrderTraverseNode(node: Node<T> | null, cb: Function) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, cb)
      cb(node.key)
      this.inOrderTraverseNode(node.right, cb)
    }
  }

  preOrderTraverse(cb: Function) {
    this.preOrderTraverseNode(this.root, cb)
  }

  private preOrderTraverseNode(node: Node<T> | null, cb: Function) {
    if (node != null) {
      cb(node.key)
      this.inOrderTraverseNode(node.left, cb)
      this.inOrderTraverseNode(node.right, cb)
    }
  }

  postOrderTraverse(cb: Function) {
    this.postOrderTraverseNode(this.root, cb)
  }

  private postOrderTraverseNode(node: Node<T> | null, cb: Function) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, cb)
      this.inOrderTraverseNode(node.right, cb)
      cb(node.key)
    }
  }

  // BST最左侧节点即为最小值
  min() {
    return this.minNode(this.root)
  }

  protected minNode(node: Node<T> | null) {
    let current = node

    while (current != null && current.left != null)
      current = current.left

    return current
  }

  // BST最右侧节点即为最大值
  max() {
    return this.maxNode(this.root)
  }

  protected maxNode(node: Node<T> | null) {
    let current = node

    while (current != null && current.right != null)
      current = current.right

    return current
  }

  search(key: T) {
    return this.searchNode(this.root, key)
  }

  protected searchNode(node: Node<T> | null, key: T): boolean {
    if (node == null)
      return false

    if (this.compareFn(key, node.key) === Compare.LESS_THAN)
      return this.searchNode(node.left, key)

    else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN)
      return this.searchNode(node.right, key)

    else
      return true
  }

  remove(key: T) {
    this.root = this.removeNode(this.root, key)
  }

  protected removeNode(node: Node<T> | null, key: T) {
    if (node == null)
      return null

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 寻找的值小于当前节点，那么寻找左侧
      node.left = this.removeNode(node.left, key)
      return node
    }
    else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 寻找的值大于当前节点，那么寻找右侧
      node.right = this.removeNode(node.right, key)
      return node
    }
    else {
      // 找到节点执行删除操作

      // 执行三种特殊情况
      // 1 - 当前节点为叶子节点
      // 2 - 当前节点只有一个子节点
      // 3 - 当前节点存在两个子节点

      if (node.left == null && node.right == null) {
        node = null
        return node
      }

      if (node.left == null) {
        node = node.right
        return node
      }
      else if (node.right == null) {
        node = node.left
        return node
      }

      //                    删除为 17 的节点
      //             12                           12
      //          8      17         =>         8      18
      //        6  9   13  20                6  9   13  20
      //                 18  21                           21

      const aux = this.minNode(node.right)!
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}
