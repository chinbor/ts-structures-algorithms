import type { IEqualsFunction } from './linkedList'
import { LinkdeList, defaultEquals } from './linkedList'

export type ICompareFunction<T> = (a: T, b: T) => number

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b)
    return Compare.EQUALS

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export class SortedLinkedList<T> extends LinkdeList<T> {
  constructor(
    protected equalsFn: IEqualsFunction<T> = defaultEquals,
    protected compareFn: ICompareFunction<T> = defaultCompare,
  ) {
    super(equalsFn)
  }

  private getIndexNextSortedElement(ele: T) {
    let current = this.head
    let i = 0

    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(ele, current.element)
      // NOTE: 这里的顺序是小到大（可以改变这里的枚举值改变排序顺序）
      if (comp === Compare.LESS_THAN)
        return i

      current = current.next
    }

    return i
  }

  push(ele: T): void {
    if (this.isEmpty()) {
      super.push(ele)
    }
    else {
      const index = this.getIndexNextSortedElement(ele)
      super.insert(ele, index)
    }
  }

  insert(ele: T, index: number): boolean {
    if (this.isEmpty())
      return super.insert(ele, index)

    index = this.getIndexNextSortedElement(ele)
    return super.insert(ele, index)
  }
}
