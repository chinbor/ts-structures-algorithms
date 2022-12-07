import { quickSort } from './quick-sort'
import { DOES_NOT_EXIST } from './sequential-search'
import type { ICompareFunction } from './sortedLinkedList'
import { Compare, defaultCompare } from './sortedLinkedList'

export function binarySearch<T>(array: T[], value: T, compareFn: ICompareFunction<T> = defaultCompare) {
  const sortedArray = quickSort(array)

  let low = 0
  let high = sortedArray.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = sortedArray[mid]

    if (compareFn(element, value) === Compare.LESS_THAN)
      low = mid + 1

    else if (compareFn(element, value) === Compare.BIGGER_THAN)
      high = mid - 1

    else
      return mid
  }

  return DOES_NOT_EXIST
}

function binarySearchRecursiveHelp<T>(array: T[], value: T, low: number, high: number, compareFn: ICompareFunction<T> = defaultCompare): number {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = array[mid]

    if (compareFn(element, value) === Compare.LESS_THAN)
      return binarySearchRecursiveHelp(array, value, mid + 1, high, compareFn)

    else if (compareFn(element, value) === Compare.BIGGER_THAN)
      return binarySearchRecursiveHelp(array, value, low, mid - 1, compareFn)

    else
      return mid
  }

  return DOES_NOT_EXIST
}

export function binarySearchRecursive<T>(array: T[], value: T, compareFn: ICompareFunction<T> = defaultCompare) {
  const sortedArray = quickSort(array)
  const low = 0
  const high = sortedArray.length - 1

  return binarySearchRecursiveHelp(array, value, low, high, compareFn)
}
