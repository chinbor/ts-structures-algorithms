import type { ICompareFunction } from './sortedLinkedList'
import { Compare, defaultCompare } from './sortedLinkedList'
import { BinarySearchTree, Node } from './binary-search-tree'

export enum Colors {
  RED = 0,
  BLACK = 1,
}

export class RedBlackNode<K> extends Node<K> {
  left: RedBlackNode<K> | null = null
  right: RedBlackNode<K> | null = null
  parent: RedBlackNode<K> | null = null
  color: Colors

  constructor(public key: K) {
    super(key)
    this.color = Colors.RED
  }
}

export class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T> | null = null

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn)
  }

  insert(key: T) {
    if (this.root == null) {
      this.root = new RedBlackNode(key)
      this.root.color = Colors.BLACK
    }
    else {
      const newNode = this.insertNode(this.root, key)
      // 这里！！！需要对插入的节点的属性进行修正！！！
      this.fixTreeProperties(newNode)
    }
  }

  // 返回插入的节点
  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key)
        node.left.parent = node
        return node.left
      }
      else {
        return this.insertNode(node.left, key)
      }
    }
    else if (node.right == null) {
      node.right = new RedBlackNode(key)
      node.right.parent = node
      return node.right
    }
    else {
      return this.insertNode(node.right, key)
    }
  }

  private rotationLL(node: RedBlackNode<T>) {
    const tmp = node.left
    node.left = tmp!.right
    if (tmp!.right && tmp!.right.key)
      tmp!.right.parent = node

    tmp!.parent = node.parent
    if (!node.parent) {
      this.root = tmp!
    }
    else {
      if (node === node.parent.left)
        node.parent.left = tmp!

      else
        node.parent.right = tmp!
    }
    tmp!.right = node
    node.parent = tmp!
  }

  private rotationRR(node: RedBlackNode<T>) {
    const tmp = node.right
    node.right = tmp!.left
    if (tmp!.left && tmp!.left.key)
      tmp!.left.parent = node

    tmp!.parent = node.parent
    if (!node.parent) {
      this.root = tmp!
    }
    else {
      if (node === node.parent.left)
        node.parent.left = tmp!

      else
        node.parent.right = tmp!
    }
    tmp!.left = node
    node.parent = tmp!
  }

  private fixTreeProperties(node: RedBlackNode<T>) {
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
      let parent = node.parent
      const grandParent = parent.parent

      // A：父节点是爷爷节点的左侧节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right

        // 1: uncle of node is also red - only recoloring
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        }
        else {
          // case 2: node is right child - left rotate
          if (node === parent.right) {
            this.rotationRR(parent)
            node = parent
            parent = node.parent!
          }

          // case 3: node is left child - right rotate
          this.rotationLL(grandParent)
          // swap color
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }
      // B：父节点是爷爷节点的右侧节点
      else {
        const uncle = grandParent!.left

        // case 1: uncle is read - only recoloring
        if (uncle && uncle.color === Colors.RED) {
          grandParent!.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent!
        }
        else {
          // case 2: node is left child - left rotate
          if (node === parent.left) {
            this.rotationLL(parent)
            node = parent
            parent = node.parent!
          }

          // case 3: node is right child - left rotate
          this.rotationRR(grandParent!)
          // swap color
          parent.color = Colors.BLACK
          grandParent!.color = Colors.RED
          node = parent
        }
      }
    }

    this.root!.color = Colors.BLACK
  }

  // TODO: ADD remove Function
}
