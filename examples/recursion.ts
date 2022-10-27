// 迭代版本的阶乘
export function factorialIterative(number: number) {
  if (number < 0)
    return undefined

  let total = 1
  for (let n = number; n > 1; n--)
    total *= n

  return total
}

// 递归版本的阶乘
export function factorial(n: number): number | undefined {
  if (n < 0)
    return undefined

  if (n === 1 || n === 0)
    return 1

  return n * factorial(n - 1)!
}

// 递归版本的斐波拉契
export function fibonacci(n: number): number {
  if (n < 1)
    return 0 // {1}
  if (n <= 2)
    return 1 // {2}
  return fibonacci(n - 1) + fibonacci(n - 2) // {3}
}

// 迭代版本的斐波拉契
export function fibonacciIterative(n: number) {
  if (n < 1)
    return 0
  let fibNMinus2 = 0
  let fibNMinus1 = 1
  let fibN = n
  for (let i = 2; i <= n; i++) {
    // n >= 2
    fibN = fibNMinus1 + fibNMinus2 // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1
    fibNMinus1 = fibN
  }
  return fibN
}

// 记忆版本的斐波拉契
export function fibonacciMemoization(n: number) {
  if (n < 1)
    return 0
  const memo = [0, 1]
  const fibonacciMem = (num: number): number => {
    if (memo[num] != null)
      return memo[num]
    return (memo[num] = fibonacciMem(num - 1) + fibonacciMem(num - 2))
  }
  return fibonacciMem(n)
}
