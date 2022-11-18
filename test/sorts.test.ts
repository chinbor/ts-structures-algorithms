import { describe, expect, test } from 'vitest'
import { modifiedBubbleSort } from '../examples/bubble-sort'

describe('Sorts', () => {
  const arr = [8, 7, 5, 4, 3, 2]

  test('bubbleSort', () => {
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
})
