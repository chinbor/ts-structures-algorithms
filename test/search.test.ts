import { describe, expect, test } from 'vitest'
import { sequentialSearch } from '../examples/sequential-search'
import { binarySearch, binarySearchRecursive } from '../examples/binary-search'

describe('Searches', () => {
  test('sequentialSearch', () => {
    const arr = [322, 512, 13423, 6123, 421, 223, 734, 21, 12, 2]
    const findValue = 421

    expect(sequentialSearch(arr, findValue)).toMatchInlineSnapshot('4')
  })

  test('binarySearch', () => {
    const arr = [322, 512, 13423, 6123, 421, 223, 734, 21, 12, 2, 123, 234, 456, 123, 567, 123, 567, 123, 678, 123123, 678, 556456]
    const findValue = 421

    expect(binarySearch(arr, findValue)).toMatchInlineSnapshot('10')
  })

  test('binarySearchRecursive', () => {
    const arr = [322, 512, 13423, 6123, 421, 223, 734, 21, 12, 2, 123, 234, 456, 123, 567, 123, 567, 123, 678, 123123, 678, 556456]
    const findValue = 421

    expect(binarySearchRecursive(arr, findValue)).toMatchInlineSnapshot('10')
  })
})
