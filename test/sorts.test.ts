import { describe, expect, test } from 'vitest'
import { modifiedBubbleSort } from '../examples/bubble-sort'
import { selectionSort } from '../examples/selection-sort'
import { insertionSort } from '../examples/insertion-sort'
import { mergeSort } from '../examples/merge-sort'
import { quickSort, quickSortByChatGpt } from '../examples/quick-sort'
import { countingSort } from '../examples/counting-sort'
import { bucketSort } from '../examples/bucket-sort'
import { radixSort } from '../examples/radix-sort'

describe('Sorts', () => {
  test('bubbleSort', () => {
    const arr = [8, 7, 5, 4, 3, 2]

    expect(modifiedBubbleSort(arr)).toMatchInlineSnapshot(`
      [
        2,
        3,
        4,
        5,
        7,
        8,
      ]
    `)
  })

  test('selectionSort', () => {
    const arr = [8, 7, 5, 4, 3, 2]

    expect(selectionSort(arr)).toMatchInlineSnapshot(`
      [
        2,
        3,
        4,
        5,
        7,
        8,
      ]
    `)
  })

  test('insertionSort', () => {
    const arr = [8, 7, 5, 4, 3, 2]

    expect(insertionSort(arr)).toMatchInlineSnapshot(`
      [
        2,
        3,
        4,
        5,
        7,
        8,
      ]
    `)
  })

  test('mergeSort', () => {
    const arr = [8, 7, 6, 5, 4, 3, 2, 1]

    expect(mergeSort(arr)).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
      ]
    `)
  })

  test('quickSort', () => {
    const arr = [3, 5, 1, 6, 4, 7, 2]

    expect(quickSort(arr)).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ]
    `)
  })

  test('quickSortByChatGpt', () => {
    const arr = [322, 512, 13423, 6123, 421, 223, 734, 21, 12, 2, 100, 321, 343, 12313, 345345, 123435, 456]

    expect(quickSortByChatGpt(arr)).toMatchInlineSnapshot(`
      [
        2,
        12,
        21,
        100,
        223,
        321,
        322,
        343,
        421,
        456,
        512,
        734,
        6123,
        12313,
        13423,
        123435,
        345345,
      ]
    `)
  })

  test('countingSort', () => {
    const arr = [3, 5, 1, 6, 4, 7, 2, 1, 2]

    expect(countingSort(arr)).toMatchInlineSnapshot(`
      [
        1,
        1,
        2,
        2,
        3,
        4,
        5,
        6,
        7,
      ]
    `)
  })

  test('bucketCount', () => {
    const arr = [3, 5, 1, 6, 4, 7, 2, 1, 2]

    expect(bucketSort(arr)).toMatchInlineSnapshot(`
      [
        1,
        1,
        2,
        2,
        3,
        4,
        5,
        6,
        7,
      ]
    `)
  })

  test('radixSort', () => {
    const arr = [322, 512, 13423, 6123, 421, 223, 734, 21, 12, 2]

    expect(radixSort(arr)).toMatchInlineSnapshot(`
      [
        2,
        12,
        21,
        223,
        322,
        421,
        512,
        734,
        6123,
        13423,
      ]
    `)
  })
})
