// O(n)复杂度的栈（因为咱们使用的数组进行存储，那么添加元素删除元素 数组底层都会自己进行寻找以及遍历操作）
// class Stack1 {
//   private items: any[]
//   constructor() {
//     this.items = []
//   }

//   push(ele: any) {
//     this.items.push(ele)
//   }

//   pop() {
//     return this.items.pop()
//   }

//   peek() {
//     return this.items[this.items.length - 1]
//   }

//   isEmpty() {
//     return this.items.length === 0
//   }

//   clear() {
//     this.items = []
//   }

//   size() {
//     return this.items.length
//   }
// }

// O(1)复杂度
export class Stack<T = any> {
  private items: Record<number, any>
  private count: number

  constructor() {
    this.items = {}
    this.count = 0
  }

  push(ele: T) {
    this.items[this.count] = ele
    this.count++
  }

  pop() {
    if (this.isEmpty())
      return undefined

    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peek() {
    if (this.isEmpty())
      return undefined

    return this.items[this.count - 1]
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.count === 0
  }

  clear() {
    this.items = {}
    this.count = 0
  }

  toString() {
    if (this.isEmpty())
      return ''

    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++)
      objString = `${objString},${this.items[i]}`

    return objString
  }
}

// number为正整数！！
export function decimalToBinary(decNumber: number): string {
  const remStack = new Stack<number>()

  let number = decNumber

  let rem
  let binaryString = ''

  while (number > 0) {
    // 3.5 % 2 = 1.5，所以向下取整
    rem = Math.floor(number % 2)
    remStack.push(rem)
    number = Math.floor(number / 2)
  }

  while (!remStack.isEmpty())
    binaryString += remStack.pop().toString()

  return binaryString
}

export function baseConverter(decNumber: number, base: number) {
  const remStack = new Stack()

  // 2进制余数只能是 0 | 1，3进制余数只能是 0 | 1 | 2，以此类推
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let number = decNumber
  let rem
  let binaryString = ''

  if (!(base >= 2 && base <= 36))
    return ''

  while (number > 0) {
    // 3.5 % 2 = 1.5，所以向下取整
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }

  while (!remStack.isEmpty())
    binaryString += digits[remStack.pop()]

  return binaryString
}

export function parenthesesChecker(symbols: string) {
  const stack = new Stack<string>()
  const opens = '({['
  const closers = ')}]'
  let balanced = true
  let index = 0
  let symbol: string
  let top: string

  while (index < symbols.length && balanced) {
    symbol = symbols[index]

    if (opens.includes(symbol)) {
      stack.push(symbol)
    }
    else {
      if (stack.isEmpty()) { balanced = false }
      else {
        top = stack.pop()

        if (!(opens.indexOf(top) === closers.indexOf(symbol)))
          balanced = false
      }
    }

    index++
  }

  // NOTE: stack.isEmpty() 因为 类似于输入 '(' 则stack不为空且balanced为true
  return balanced && stack.isEmpty()
}

export function hanoi(
  plates: number,
  source: string,
  helper: string,
  dest: string,
  moves: string[][] = [],
) {
  if (plates <= 0)
    return moves

  if (plates === 1) {
    moves.push([source, dest])
  }
  else {
    hanoi(plates - 1, source, dest, helper, moves)
    moves.push([source, dest])
    hanoi(plates - 1, helper, source, dest, moves)
  }
  return moves
}

function towerOfHanoi(
  plates: number,
  source: Stack<number>,
  helper: Stack<number>,
  dest: Stack<number>,
  sourceName: string, helperName: string, destName: string,
  moves: any[] = [],
) {
  if (plates <= 0)
    return moves

  if (plates === 1) {
    dest.push(source.pop())
    const move: any = {}
    move[sourceName] = source.toString()
    move[helperName] = helper.toString()
    move[destName] = dest.toString()
    moves.push(move)
  }
  else {
    towerOfHanoi(plates - 1, source, dest, helper, sourceName, destName, helperName, moves)
    dest.push(source.pop())
    const move: any = {}
    move[sourceName] = source.toString()
    move[helperName] = helper.toString()
    move[destName] = dest.toString()
    moves.push(move)
    towerOfHanoi(plates - 1, helper, source, dest, helperName, sourceName, destName, moves)
  }
  return moves
}

export function hanoiStack(plates: number) {
  const source = new Stack<number>()
  const dest = new Stack<number>()
  const helper = new Stack<number>()

  for (let i = plates; i > 0; i--)
    source.push(i)

  return towerOfHanoi(plates, source, helper, dest, 'source', 'helper', 'dest')
}
