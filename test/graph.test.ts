import { describe, expect, test } from 'vitest'
import { Graph } from '../examples/graph'

describe('graph.ts', () => {
  test('Graph', () => {
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
})
