import { Dictionary } from './dictionary'

export class Graph {
  private vertices: (string | number)[] = []
  private adjList: Dictionary<string | number, (string | number)[]> = new Dictionary()

  constructor(private isDirected = false) {}

  addVertex(v: string | number) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  addEdge(a: string | number, b: string | number) {
    // 验证添加的两个顶点是否在 adjList 列表中，不存在则都添加进去！！
    if (!this.adjList.get(a))
      this.addVertex(a)

    if (!this.adjList.get(b))
      this.addVertex(b)

    // a -> b
    this.adjList.get(a)?.push(b)

    // 若为无向图 b -> a，否则只是单向 a -> b
    if (!this.isDirected)
      this.adjList.get(b)?.push(a)
  }

  getVertices() {
    return this.vertices
  }

  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = ''

    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])!

      for (let j = 0; j < neighbors.length; j++)
        s += `${neighbors[j]} `

      s += '\n'
    }

    return s
  }
}
