import type { ICompareFunction } from './sortedLinkedList'
import { Compare, defaultCompare } from './sortedLinkedList'

function merge<T>(left: T[], right: T[], compareFn: ICompareFunction<T>) {
  let i = 0
  let j = 0
  const result = []

  // 注意这里使用 i j 进行比较 left数组与right数组 中的元素
  while (i < left.length && j < right.length)
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])

  // 判断是left先遍历完毕还是right，
  // 1. 若为right先遍历完毕也就是此时 i < left.length 那么说明left余下部分都是大于right中元素
  // 2. 若为left先遍历完毕也就是此时 i >= left.length 那么说明right余下部分都是大于left中元素
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

export function mergeSort<T>(array: T[], compareFn = defaultCompare): T[] {
  // 结束条件就是array.length === 1
  if (array.length > 1) {
    const { length } = array

    // 数组中间部分
    const middle = Math.floor(length / 2)

    // 0 ~ middle
    const left = mergeSort(array.slice(0, middle), compareFn)

    // middle ~ array.length
    const right = mergeSort(array.slice(middle, length), compareFn)

    // 左右进行合并
    array = merge(left, right, compareFn)
  }

  return array
}
