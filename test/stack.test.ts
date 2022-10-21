import { describe, expect, test } from 'vitest'
import { Stack, baseConverter, decimalToBinary, hanoi, hanoiStack, parenthesesChecker } from '../examples/stack'

describe('stack.ts', () => {
  test('Stack', () => {
    const stack = new Stack()

    stack.push(1)
    stack.push(2)

    expect(stack.toString()).toMatchInlineSnapshot('"1,2"')

    expect(stack.size()).toBe(2)

    expect(stack.pop()).toBe(2)

    expect(stack.peek()).toBe(1)

    expect(stack.isEmpty()).toBe(false)

    stack.clear()

    expect(stack.size()).toBe(0)
  })

  test('decimalToBinary', () => {
    expect(decimalToBinary(10)).toBe('1010')
  })

  test('baseConverter', () => {
    // TODO: 可以依次罗列 2 - 36的所有进制关系
    expect(baseConverter(11, 16)).toBe('B')
  })

  test('parenthesesChecker', () => {
    expect(parenthesesChecker('(')).toBe(false)
    expect(parenthesesChecker('()')).toBe(true)
    expect(parenthesesChecker('')).toBe(true)
    expect(parenthesesChecker('([]')).toBe(false)
    expect(parenthesesChecker('([{}])')).toBe(true)
  })

  test('hanoi', () => {
    expect(hanoi(3, 'A', 'B', 'C')).toMatchInlineSnapshot(`
      [
        [
          "A",
          "C",
        ],
        [
          "A",
          "B",
        ],
        [
          "C",
          "B",
        ],
        [
          "A",
          "C",
        ],
        [
          "B",
          "A",
        ],
        [
          "B",
          "C",
        ],
        [
          "A",
          "C",
        ],
      ]
    `)
  })

  test('hanoiStack', () => {
    expect(hanoiStack(3)).toMatchInlineSnapshot(`
      [
        {
          "dest": "1",
          "helper": "",
          "source": "3,2",
        },
        {
          "dest": "1",
          "helper": "2",
          "source": "3",
        },
        {
          "dest": "",
          "helper": "2,1",
          "source": "3",
        },
        {
          "dest": "3",
          "helper": "2,1",
          "source": "",
        },
        {
          "dest": "3",
          "helper": "2",
          "source": "1",
        },
        {
          "dest": "3,2",
          "helper": "",
          "source": "1",
        },
        {
          "dest": "3,2,1",
          "helper": "",
          "source": "",
        },
      ]
    `)
  })
})
