import { describe, expect, test } from 'vitest'
import { heapSort } from '../examples/heap-sort'

describe('stack.ts', () => {
  test('Stack', () => {
    const data = [
      {
        val: 1,
        id: '',
      },
      {
        val: 4,
        id: 'A1',
      },
      {
        val: 3,
        id: '',
      },
      {
        val: 6,
        id: '',
      },
      {
        val: 9,
        id: '',
      },
      {
        val: 10,
        id: '',
      },
      {
        val: 7,
        id: '',
      },
      {
        val: 4,
        id: 'A2',
      },
    ]

    interface Test {
      val: number
      id: string
    }

    function defaultCompare(a: Test, b: Test): number {
      return a.val - b.val
    }

    expect(heapSort<Test>(data, defaultCompare)).toMatchInlineSnapshot(`
      [
        {
          "id": "",
          "val": 1,
        },
        {
          "id": "",
          "val": 3,
        },
        {
          "id": "A2",
          "val": 4,
        },
        {
          "id": "A1",
          "val": 4,
        },
        {
          "id": "",
          "val": 6,
        },
        {
          "id": "",
          "val": 7,
        },
        {
          "id": "",
          "val": 9,
        },
        {
          "id": "",
          "val": 10,
        },
      ]
    `)
  })
})
