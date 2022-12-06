import { findMaxValue } from './counting-sort'
import { Compare, defaultCompare } from './sortedLinkedList'

export function findMinValue<T>(array: T[], compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let min = array[0]

    for (let i = 1; i < array.length; i++) {
      if (compareFn(min, array[i]) === Compare.BIGGER_THAN)
        min = array[i]
    }

    return min
  }

  return undefined
}

function countingSortForRadix(array: number[], radixBase: number, significantDigit: number, minValue: number) {
  let bucketsIndex
  const buckets: number[] = []
  const aux: number[] = []

  for (let i = 0; i < radixBase; i++)
    buckets[i] = 0

  // 数组正序
  for (let i = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase)
    buckets[bucketsIndex]++
  }

  // 对 buckets 中的元素除第一个外都累加前者
  for (let i = 1; i < radixBase; i++)
    buckets[i] += buckets[i - 1]

  // 数组倒序
  for (let i = array.length - 1; i >= 0; i--) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase)
    aux[--buckets[bucketsIndex]] = array[i]
  }

  // array = []
  // array.push(...aux)
  for (let i = 0; i < array.length; i++)
    array[i] = aux[i]

  return array
}

export function radixSort(array: number[], radixBase = 10) {
  if (array.length < 2)
    return array

  const minValue = findMinValue(array)!
  const maxValue = findMaxValue(array)!

  let significantDigit = 1

  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue)

    significantDigit *= radixBase
  }

  return array
}
