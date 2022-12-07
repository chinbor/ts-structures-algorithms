import { swap } from './heap'
import type { ICompareFunction } from './sortedLinkedList'
import { Compare, defaultCompare } from './sortedLinkedList'

function partition(array: any[], left: number, right: number, compareFn: ICompareFunction<any>) {
  const pivot = array[Math.floor((right + left) / 2)]
  let i = left
  let j = right

  // 当左指针指向的元素比主元大且右指针指向的元素比主元小，并且此时左指针索引没有右指针索引大时，交换它们，并且此时左指针索引没有右指针索引大
  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN)
      i++

    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN)
      j--

    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }

  return i
}

function quick(array: any[], left: number, right: number, compareFn: ICompareFunction<any>) {
  let index

  // 中止条件 <= 1
  if (array.length > 1) {
    // partition返回 左指针的索引
    index = partition(array, left, right, compareFn)

    if (left < index - 1)
      // 左侧再进行划分
      quick(array, left, index - 1, compareFn)

    if (index < right)
      // 右侧再进行划分
      quick(array, index, right, compareFn)
  }

  return array
}

export const quickSort = (array: any[], compareFn = defaultCompare) => {
  return quick(array, 0, array.length - 1, compareFn)
}

// NOTE: 5555~~~~ chatGpt的实现真的好理解太多了！！！
export function quickSortByChatGpt(arr: number[]): number[] {
  if (arr.length <= 1)
    return arr

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]

  const left = []
  const right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot)
      left.push(arr[i])

    else
      right.push(arr[i])
  }

  return quickSort(left).concat([pivot], quickSort(right))
}
