import { Colors, initializeColor } from './breadth-first-search'
import type { Dictionary } from './dictionary'
import type { Graph } from './graph'

const depthFirstSearchVisit = (
  v: string | number,
  color: any,
  adjList: Dictionary<string | number, (string | number)[]>,
  callback: (v: string | number) => void,
) => {
  // 顶点置为灰色，表示访问过
  color[v] = Colors.GREY
  callback && callback(v)

  // 获取顶点的所有邻接点
  const neighbors = adjList.get(v)!

  // 所有邻接点若为白色那么递归继续访问
  for (const w of neighbors) {
    if (color[w] === Colors.WHITE)
      depthFirstSearchVisit(w, color, adjList, callback)
  }

  // 顶点设置为完全探索
  color[v] = Colors.BLACK
}

export const depthFirstSearch = (graph: Graph, callback: (v: string | number) => void) => {
  // 获取所有顶点
  const vertices = graph.getVertices()
  // 获取所有邻接点
  const adjList = graph.getAdjList()
  // 获取所有顶点的顶点颜色
  const color = initializeColor(vertices)

  for (const v of vertices) {
    if (color[v] === Colors.WHITE)
      depthFirstSearchVisit(v, color, adjList, callback)
  }
}

const DFSVisit = (
  v: string | number,
  color: any,
  d: any,
  f: any,
  p: any,
  time: { count: number },
  adjList: Dictionary<string | number, (string | number)[]>,
) => {
  color[v] = Colors.GREY
  // 发现时间
  d[v] = ++time.count

  // 获取顶点的所有邻接点
  const neighbors = adjList.get(v)!

  // 所有邻接点若为白色那么递归继续访问
  for (const w of neighbors) {
    if (color[w] === Colors.WHITE) {
      p[w] = v
      DFSVisit(w, color, d, f, p, time, adjList)
    }
  }

  // 顶点设置为完全探索
  color[v] = Colors.BLACK

  // 完成时间
  f[v] = ++time.count
}

export const DFS = (graph: Graph) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const discovery: any = {}
  const finished: any = {}
  const predecessors: any = {}
  const time = { count: 0 }

  for (const v of vertices) {
    finished[v] = 0
    discovery[v] = 0
    predecessors[v] = null
  }

  for (const w of vertices) {
    if (color[w] === Colors.WHITE)
      DFSVisit(w, color, discovery, finished, predecessors, time, adjList)
  }

  return {
    discovery,
    finished,
    predecessors,
  }
}

export const topSort = (vertices: (string | number)[], fTimes: any = {}) => {
  let path = ''

  for (let count = 0; count < vertices.length; count++) {
    let max = 0
    let maxName = null

    for (const v of vertices) {
      if (fTimes[v] > max) {
        max = fTimes[v]
        maxName = v
      }
    }

    path += ` - ${maxName}`
    delete fTimes[maxName!]
  }

  return path
}

