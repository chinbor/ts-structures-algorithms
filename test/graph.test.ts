import { describe, expect, test } from 'vitest'
import { Graph } from '../examples/graph'
import { breadthFirstSearch, buildPaths, shortestPathByBFS } from '../examples/breadth-first-search'

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

  test('BFS', () => {
    let s = ''

    breadthFirstSearch(graph, vertices[0], (v) => {
      s = `${s + v} `
    })

    s = s.trim()

    expect(s).toMatchInlineSnapshot('"A B C D E F"')
  })

  test('shortestPath', () => {
    // 可以是任意顶点开始！！
    const shortestPath = shortestPathByBFS(graph, 'B')

    expect(buildPaths(vertices[1], vertices, shortestPath.predecessors)).toMatchInlineSnapshot(`
      [
        "B",
        "B - A - C",
        "B - A - D",
        "B - E",
        "B - F",
      ]
    `)
  })
})
