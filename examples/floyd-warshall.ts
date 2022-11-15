export const floydWarshall = (graph: number[][]) => {
  const dist: number[][] = []
  const length = graph.length

  // 初始化dist数组（对角线都是0，其余位置保持原来graph的数值）
  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      // 对角线都是0，自己到自己！
      if (i === j)
        dist[i][j] = 0

      // 如果 graph[i][j] 为INF表示 i -> j不存在距离！！
      else if (!isFinite(graph[i][j]))
        dist[i][j] = Infinity

      // i -> j存在距离那么就等于图中的权值
      else
        dist[i][j] = graph[i][j]
    }
  }

  // 引入中间点k，所以 i -> j = (i -> k) + (k -> j)距离之和，
  // 核心就是 dist[i][k] + dist[k][j] < dist[i][j] 进而更新
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j]
      }
    }
  }

  return dist
}
