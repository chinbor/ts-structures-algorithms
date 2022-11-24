import { describe, expect, test } from 'vitest'
import { modifiedBubbleSort } from '../examples/bubble-sort'
import { selectionSort } from '../examples/selection-sort'
import { insertionSort } from '../examples/insertion-sort'

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
})
