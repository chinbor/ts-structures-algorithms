import { describe, expect, test } from 'vitest'
import { Graph } from '../examples/graph'
import { BFS, breadthFirstSearch, buildPaths } from '../examples/breadth-first-search'
import { DFS, depthFirstSearch, topSort } from '../examples/depth-first-search'
import { dijkstra } from '../examples/dijkstra'
import { floydWarshall } from '../examples/floyd-warshall'
import { prim } from '../examples/prim'
import { kruskal } from '../examples/kruskal'

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

    expect(path).toMatchInlineSnapshot('" - B - A - D - C - F - E"')
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

  test('Dijkstra', () => {
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F']

    const graph = [
      [0, 2, 4, 0, 0, 0],
      [0, 0, 1, 4, 2, 0],
      [0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 3, 0, 2],
      [0, 0, 0, 0, 0, 0],
    ]

    expect(dijkstra(vertices, graph, 1).tmp).toMatchInlineSnapshot(`
      {
        "B -> C": "B -> B -> C, 1",
        "B -> D": "B -> B -> D, 4",
        "B -> E": "B -> B -> E, 2",
        "B -> F": "B -> E -> F, 4",
      }
    `)

    expect(dijkstra(vertices, graph, 1).dist).toMatchInlineSnapshot(`
      [
        9007199254740991,
        0,
        1,
        4,
        2,
        4,
      ]
    `)
  })

  test('FloydWarshall', () => {
    const INF = Infinity
    const graph = [
      [INF, 2, 4, INF, INF, INF],
      [INF, INF, 1, 4, 2, INF],
      [INF, INF, INF, INF, 3, INF],
      [INF, INF, INF, INF, INF, 2],
      [INF, INF, INF, 3, INF, 2],
      [INF, INF, INF, INF, INF, INF],
    ]

    expect(floydWarshall(graph)).toMatchInlineSnapshot(`
      [
        [
          0,
          2,
          3,
          6,
          4,
          6,
        ],
        [
          Infinity,
          0,
          1,
          4,
          2,
          4,
        ],
        [
          Infinity,
          Infinity,
          0,
          6,
          3,
          5,
        ],
        [
          Infinity,
          Infinity,
          Infinity,
          0,
          Infinity,
          2,
        ],
        [
          Infinity,
          Infinity,
          Infinity,
          3,
          0,
          2,
        ],
        [
          Infinity,
          Infinity,
          Infinity,
          Infinity,
          Infinity,
          0,
        ],
      ]
    `)
  })

  test('Prim', () => {
    const graph = [[0, 2, 4, 0, 0, 0],
      [2, 0, 2, 4, 2, 0],
      [4, 2, 0, 0, 3, 0],
      [0, 4, 0, 0, 3, 2],
      [0, 2, 3, 3, 0, 2],
      [0, 0, 0, 2, 2, 0],
    ]
    const parent = prim(graph)

    let str = ''

    for (let i = 1; i < graph.length; i++)
      str += `${parent[i]} - ${i}   ${graph[i][parent[i]]}\n`

    expect(str).toMatchInlineSnapshot(`
      "0 - 1   2
      1 - 2   2
      5 - 3   2
      1 - 4   2
      4 - 5   2
      "
    `)
  })

  // BUG: Oops !!! It's wrong!!!
  test('kruskal', () => {
    const graph = [[0, 2, 4, 0, 0, 0],
      [2, 0, 2, 4, 2, 0],
      [4, 2, 0, 0, 3, 0],
      [0, 4, 0, 0, 3, 2],
      [0, 2, 3, 3, 0, 2],
      [0, 0, 0, 2, 2, 0],
    ]
    const parent = kruskal(graph)

    let str = ''

    for (let i = 1; i < graph.length; i++)
      str += `${parent[i]} - ${i}   ${graph[i][parent[i]]}\n`

    expect(str).toMatchInlineSnapshot(`
      "0 - 1   2
      1 - 2   2
      1 - 3   4
      1 - 4   2
      3 - 5   2
      "
    `)
  })
})
