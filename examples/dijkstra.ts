const INF = Number.MAX_SAFE_INTEGER

const minDistance = (dist: number[], visited: boolean[]) => {
  let min = INF
  let minIndex = -1

  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v]
      minIndex = v
    }
  }

  return minIndex
}

const tmp: Record<string, any> = {}

export const dijkstra = (vertices: string[], graph: number[][], src: number) => {
  const dist: number[] = []
  const visited: boolean[] = []
  const length = graph.length

  // 初始化所有顶点距离源点距离都是无穷大，同时所有顶点都未访问
  for (let i = 0; i < length; i++) {
    dist[i] = INF
    visited[i] = false
  }

  // 源点到自己的路径置为0
  dist[src] = 0

  for (let i = 0; i < length - 1; i++) {
    // 找出距离源点最小距离的顶点u
    const u = minDistance(dist, visited)

    // 将该顶点置为已经访问（后续由于已经访问过该顶点，所以minDistance不会再次返回该顶点索引）
    visited[u] = true

    // 遍历顶点u的所有邻接点v
    for (let v = 0; v < length; v++) {
      // 1. !visited[v]表示顶点未被访问
      // 2. graph[u][v] !== 0 && dist[u] !== INF表示存在邻接点路径
      // 3. dist[u] + graph[u][v] < dist[v] 已访问顶点u到源点src的距离dist[u]加上已访问顶点u到邻接点v的距离是否小于 v到源点src的距离
      if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v]

        const key = `${vertices[src]} -> ${vertices[v]}`
        tmp[key] = `${vertices[src]} -> ${vertices[u]} -> ${vertices[v]}, ${dist[v]}`
      }
    }
  }

  return { tmp, dist }
}
