import { describe, expect, test } from 'vitest'
import { hotPotato, palindromeChecker } from '../examples/queue'

describe('queue.ts', () => {
  test('Queue', () => {
    // TODO: add tests
  })

  test('Deque', () => {
    // TODO: add tests
  })

  test('hotPotato', () => {
    const names = ['A', 'B', 'C', 'D', 'E']

    // A B C D E
    // B C D E A
    // C D E A B => LOSER C
    // D E A B
    // E A B D
    // A B D E => LOSER A
    // B D E
    // D E B
    // E B D => LOSER E
    // B D
    // D B
    // B D => LOSER D
    // B => WINNER

    expect(hotPotato(names, 2)).toMatchInlineSnapshot(`
      {
        "eliminated": [
          "C",
          "A",
          "E",
          "B",
        ],
        "winner": "D",
      }
    `)
  })

  test('palindromeChecker', () => {
    const str = 'HEllo world dlROw olleh'

    expect(palindromeChecker(str)).toMatchInlineSnapshot('true')
  })
})
