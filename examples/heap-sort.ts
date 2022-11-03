import { defaultCompare } from './sortedLinkedList'
import type { ICompareFunction } from './sortedLinkedList'
import { swap } from './heap'

function heapify(array: any[], index: number, heapSize: number, compareFn: ICompareFunction<any>) {
  let largest = index
  // 当前索引的左子节点索引
  const left = (2 * index) + 1

  // 当前索引的右子节点索引
  const right = (2 * index) + 2

  if (left < heapSize && compareFn(array[left], array[index]) > 0)
    largest = left

  if (right < heapSize && compareFn(array[right], array[largest]) > 0)
    largest = right

  if (largest !== index) {
    swap(array, index, largest)
    heapify(array, largest, heapSize, compareFn)
  }
}

function buildMaxHeap(array: any[], compareFn: ICompareFunction<any>) {
  // 最后一个非叶子节点 = Math.floor(array.length / 2) - 1，然后开始堆化
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--)
    heapify(array, i, array.length, compareFn)

  return array
}

export function heapSort<T>(array: any[], compareFn = defaultCompare<T>) {
  let heapSize = array.length

  // 构建最大堆
  buildMaxHeap(array, compareFn)

  // 交换根节点与最后节点的位置，然后再下移
  while (heapSize > 1) {
    swap(array, 0, --heapSize)
    heapify(array, 0, heapSize, compareFn)
  }

  return array
}
