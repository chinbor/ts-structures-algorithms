import { Compare, defaultCompare } from './sortedLinkedList'
import type { ICompareFunction } from './sortedLinkedList'

export function swap(array: any[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]]
}

export function reverseCompare<T>(compareFn: ICompareFunction<T>): ICompareFunction<T> {
  return (a, b) => compareFn(b, a)
}

export class MinHeap<T> {
  protected heap: T[] = []

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

  private getLeftIndex(index: number) {
    return 2 * index + 1
  }

  private getRightIndex(index: number) {
    return 2 * index + 2
  }

  private getParentIndex(index: number) {
    if (index === 0)
      return undefined

    return Math.floor((index - 1) / 2)
  }

  insert(value: T) {
    if (value != null) {
      const index = this.heap.length
      this.heap.push(value)
      this.siftUp(index)
      return true
    }

    return false
  }

  private siftUp(index: number): void {
    let parent = this.getParentIndex(index)

    while (index > 0 && this.compareFn(this.heap[Number(parent)], this.heap[index]) === Compare.BIGGER_THAN) {
      swap(this.heap, Number(parent), index)
      index = Number(parent)
      parent = this.getParentIndex(index)
    }
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() <= 0
  }

  // 最大 or 最小值
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  private siftDown(index: number) {
    let element = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()

    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN)
      element = left

    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN)
      element = right

    if (index !== element) {
      swap(this.heap, index, element)
      this.siftDown(element)
    }
  }

  extract() {
    if (this.isEmpty())
      return undefined

    if (this.size() === 1)
      return this.heap.shift()

    const removedValue = this.heap[0]
    this.heap[0] = this.heap.pop()!
    this.siftDown(0)
    return removedValue
  }
}

export class MaxHeap<T> extends MinHeap<T> {
  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }
}
