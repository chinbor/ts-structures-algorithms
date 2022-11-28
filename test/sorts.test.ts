import { describe, expect, test } from 'vitest'
import { modifiedBubbleSort } from '../examples/bubble-sort'
import { selectionSort } from '../examples/selection-sort'
import { insertionSort } from '../examples/insertion-sort'
import { mergeSort } from '../examples/merge-sort'

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
})
