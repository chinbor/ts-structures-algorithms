import { insertionSort } from './insertion-sort'

function createBuckets(array: number[], bucketSize: number): number[][] {
  let minValue = array[0]
  let maxValue = array[0]

  // 找出数组中的最大最小值
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue)
      minValue = array[i]

    else if (array[i] > maxValue)
      maxValue = array[i]
  }

  // 一个bucket的大小为5，计算需要几个bucket存放所有元素
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  const buckets: number[][] = []

  // 根据bucket的数量初始化buckets二维数组
  for (let i = 0; i < bucketCount; i++)
    buckets[i] = []

  // 计算当前元素 array[i]应该放在buckets的哪个索引数组中
  // 很简单，(最大值 - 最小值) / bucketSize 则为最大的索引，其余值都是小于最大值，所以索引只会是 `小于等于`
  for (let i = 0; i < array.length; i++)
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i])

  return buckets
}

function sortBuckets(buckets: number[][]) {
  const sortedArray = []

  for (let i = 0; i < buckets.length; i++) {
    // 很奇怪，这里不因该存在 null 或则 undefined 的情况呀
    if (buckets[i] != null) {
      insertionSort(buckets[i])

      sortedArray.push(...buckets[i])
    }
  }

  return sortedArray
}

export function bucketSort(array: number[], bucketSize = 5) {
  if (array.length < 2)
    return array

  const buckets = createBuckets(array, bucketSize)

  return sortBuckets(buckets)
}
