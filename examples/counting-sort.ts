import { Compare, defaultCompare } from './sortedLinkedList'

export function findMaxValue<T>(array: T[], compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let max = array[0]

    for (let i = 1; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN)
        max = array[i]
    }

    return max
  }

  return undefined
}

export function countingSort(array: number[]) {
  if (array.length < 2)
    return array

  const maxValue = findMaxValue(array)
  let sortedIndex = 0
  // WHY: 我们将array数组元素值（整数）作为新数组的索引，
  // 初始化长度：最大值 + 1，是因为数组是从0开始索引的
  const counts = new Array(maxValue! + 1).fill(0)

  array.forEach((ele) => {
    counts[ele]++
  })

  counts.forEach((ele, i) => {
    while (ele > 0) {
      array[sortedIndex++] = i
      ele--
    }
  })

  return array
}
