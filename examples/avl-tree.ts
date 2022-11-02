import type { ICompareFunction } from './sortedLinkedList'
import { Compare, defaultCompare } from './sortedLinkedList'
import { BinarySearchTree, Node } from './binary-search-tree'

export enum BalanceFactor {
  UNBALANCED_RIGHT = 1, // 右侧不平衡 leftHeight - rightHeight = -2
  SLIGHTLY_UNBALANCED_RIGHT = 2, // 右侧较重 leftHeight - rightHeight = -1
  BALANCED = 3, // 平衡 leftHeight - rightHeight = 0
  SLIGHTLY_UNBALANCED_LEFT = 4, // 左侧较重 leftHeight - rightHeight = 1
  UNBALANCED_LEFT = 5, // 左侧不平衡 leftHeight - rightHeight = 2
}

export class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn)
  }

  private getNodeHeight(node: Node<T> | null): number {
    if (node == null)
      return -1

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }

  private getBalanceFactor(node: Node<T>) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  private rotationLL(node: Node<T>) {
    const tmp = node.left
    node.left = tmp!.right
    tmp!.right = node
    return tmp
  }

  private rotationRR(node: Node<T>) {
    const tmp = node.right
    node.right = tmp!.left
    tmp!.left = node
    return tmp
  }

  private rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left!)
    return this.rotationLL(node)
  }

  private rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right!)
    return this.rotationRR(node)
  }

  protected insertNode(node: Node<T> | null, key: T) {
    if (node == null)
      return new Node(key)

    else if (this.compareFn(key, node.key) === Compare.LESS_THAN)
      node.left = this.insertNode(node.left, key)

    else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN)
      node.right = this.insertNode(node.right, key)

    else
      return node

    const balanceState = this.getBalanceFactor(node)

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right!.key) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node)
      }
      else {
        // Right left case
        return this.rotationRL(node)
      }
    }

    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node!.left!.key) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node!)
      }
      else {
        // Left right case
        return this.rotationLR(node!)
      }
    }

    return node
  }

  protected removeNode(node: Node<T> | null, key: T) {
    // 调用BST方法移除节点
    node = super.removeNode(node, key)

    if (node == null)
      return node

    const balanceState = this.getBalanceFactor(node)

    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      // node.left必然不可能为null！！因为 getBalanceFactor内部返回平衡因子为 UNBALANCED_LEFT 说明左侧长度减去右侧长度为2
      if (this.getBalanceFactor(node.left!) === BalanceFactor.BALANCED || this.getBalanceFactor(node.left!) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT)
        return this.rotationLL(node)

      if (this.getBalanceFactor(node.left!) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT)
        return this.rotationLR(node)
    }

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      // node.right必然不可能为null！！因为 getBalanceFactor内部返回平衡因子为 UNBALANCED_RIGHT 说明右侧长度减去左侧长度为2
      if (this.getBalanceFactor(node.right!) === BalanceFactor.BALANCED || this.getBalanceFactor(node.right!) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT)
        return this.rotationRR(node)

      if (this.getBalanceFactor(node.right!) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT)
        return this.rotationRL(node)
    }

    return node
  }
}
