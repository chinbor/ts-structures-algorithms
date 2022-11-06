import { describe, expect, test } from 'vitest'
import { Graph } from '../examples/graph'
import { BFS, breadthFirstSearch, buildPaths } from '../examples/breadth-first-search'
import { DFS, depthFirstSearch, topSort } from '../examples/depth-first-search'

describe('graph.ts', () => {
  const graph = new Graph()
  const vertices = ['A', 'B', 'C', 'D', 'E', 'F']

  for (const v of vertices)
    graph.addVertex(v)

  graph.addEdge('A', 'B')
  graph.addEdge('A', 'C')
  graph.addEdge('A', 'D')
  graph.addEdge('B', 'E')
  graph.addEdge('B', 'F')
  graph.addEdge('C', 'D')

  test('Graph', () => {
    expect(graph.toString()).toMatchInlineSnapshot(`
      "A -> B C D 
      B -> A E F 
      C -> A D 
      D -> A C 
      E -> B 
      F -> B 
      "
    `)
  })

  test('breadthFirstSearch', () => {
    let s = ''

    breadthFirstSearch(graph, vertices[0], (v) => {
      s = `${s + v} `
    })

    s = s.trim()

    expect(s).toMatchInlineSnapshot('"A B C D E F"')
  })

  test('BFS', () => {
    // NOTE: 注意咱们的 vertices第一个元素一定是作为最短路径shortestPathByBFS的 startVertex 以及 buildPaths中的 startVertex
    // buildPaths 不是一个通用的方法
    const graph = new Graph()
    const vertices = ['B', 'A', 'C', 'D', 'E', 'F']

    for (const v of vertices)
      graph.addVertex(v)

    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')
    graph.addEdge('A', 'D')
    graph.addEdge('B', 'E')
    graph.addEdge('B', 'F')
    graph.addEdge('C', 'D')

    const shortestPath = BFS(graph, vertices[0])

    expect(buildPaths(vertices[0], vertices, shortestPath.predecessors)).toMatchInlineSnapshot(`
      [
        "B - A",
        "B - A - C",
        "B - A - D",
        "B - E",
        "B - F",
      ]
    `)
  })

  test('depthFirstSearch', () => {
    let s = ''

    depthFirstSearch(graph, (v) => {
      s = `${s + v} `
    })

    s = s.trim()

    expect(s).toMatchInlineSnapshot('"A B E F C D"')
  })

  test('DFS-topSort', () => {
    const graph = new Graph(true)
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F']

    for (const v of vertices)
      graph.addVertex(v)

    graph.addEdge('A', 'C')
    graph.addEdge('A', 'D')
    graph.addEdge('B', 'D')
    graph.addEdge('B', 'E')
    graph.addEdge('C', 'F')
    graph.addEdge('F', 'E')

    const result = DFS(graph)

    const path = topSort(vertices, result.finished)

    expect(path).toMatchInlineSnapshot('" - E - F - C - D - A - B"')
  })

  // 在 DFS 测试用例中改变顶点顺序
  test('DFS-order-topSort', () => {
    const graph = new Graph(true)
    const vertices = ['B', 'A', 'C', 'E', 'D', 'F']

    for (const v of vertices)
      graph.addVertex(v)

    graph.addEdge('A', 'C')
    graph.addEdge('A', 'D')
    graph.addEdge('B', 'D')
    graph.addEdge('B', 'E')
    graph.addEdge('C', 'F')
    graph.addEdge('F', 'E')

    const result = DFS(graph)

    const path = topSort(vertices, result.finished)

    expect(path).toMatchInlineSnapshot('" - A - C - F - B - E - D"')
  })
})
