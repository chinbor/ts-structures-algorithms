import type { Graph } from './graph'
import { Queue } from './queue'
import { Stack } from './stack'

export enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

export const initializeColor = (vertices: (string | number)[]) => {
  const color: any = {}
  for (let i = 0; i < vertices.length; i++)
    color[vertices[i]] = Colors.WHITE

  return color
}

export const breadthFirstSearch = (graph: Graph, startVertex: number | string, callback: (v: number | string) => void) => {
  // 获取图中所有顶点
  const vertices = graph.getVertices()
  // 获取所有的顶点的关系
  const adjList = graph.getAdjList()
  // 初始化顶点颜色为全白（表示未访问）
  const color = initializeColor(vertices)
  // 创建队列用于存储顶点！
  const queue = new Queue()

  // 开始搜索的顶点
  queue.enqueue(startVertex)

  while (!queue.isEmpty()) {
    // 从队列中去取顶点
    const u = queue.dequeue()
    // 获取顶点的相邻顶点
    const neighbors = adjList.get(u)!
    // 顶点颜色设置为灰色（表示已访问）
    color[u] = Colors.GREY

    for (const v of neighbors) {
      if (color[v] === Colors.WHITE) {
        color[v] = Colors.GREY
        queue.enqueue(v)
      }
    }

    color[u] = Colors.BLACK

    callback && callback(u)
  }
}

// 指定源顶点
export const BFS = (graph: Graph, startVertex: number | string) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  const distances: any = {}
  const predecessors: any = {}

  queue.enqueue(startVertex)

  for (const v of vertices) {
    distances[v] = 0
    predecessors[v] = null
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)!
    color[u] = Colors.GREY

    for (const v of neighbors) {
      if (color[v] === Colors.WHITE) {
        color[v] = Colors.GREY
        distances[v] = distances[u] + 1
        predecessors[v] = u
        queue.enqueue(v)
      }
    }

    color[u] = Colors.BLACK
  }

  return {
    distances,
    predecessors,
  }
}

export const buildPaths = (startVertex: number | string, vertices: (string | number)[], predecessors: any = {}) => {
  const fromVertex = startVertex
  const paths = []

  for (let i = 1; i < vertices.length; i++) {
    const toVertex = vertices[i]
    const path = new Stack()

    for (let v = toVertex; v !== fromVertex; v = predecessors[v])
      path.push(v)

    path.push(fromVertex)

    let s = path.pop()

    while (!path.isEmpty())
      s += ` - ${path.pop()}`

    paths.push(s)
  }

  return paths
}
