const INF = Number.MAX_SAFE_INTEGER

const find = (i: number, parent: number[]) => {
  while (parent[i])
    i = parent[i]

  return i
}

const union = (i: number, j: number, parent: number[]) => {
  if (i !== j) {
    parent[j] = i
    return true
  }

  return false
}

const initializeCost = (graph: number[][]) => {
  const cost: number[][] = []
  const length = graph.length

  for (let i = 0; i < length; i++) {
    cost[i] = []
    for (let j = 0; j < length; j++) {
      if (graph[i][j] === 0)
        cost[i][j] = INF

      else
        cost[i][j] = graph[i][j]
    }
  }

  return cost
}

export const kruskal = (graph: number[][]) => {
  const length = graph.length
  const parent: number[] = []
  let ne = 0
  let a
  let b
  let u
  let v

  const cost = initializeCost(graph)

  while (ne < length - 1) {
    // 找出cost数组中的权值最小边（注意边是用的矩阵索引表示的）
    for (let i = 0, min = INF; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j]
          a = u = i
          b = v = j
        }
      }
    }

    // WHY: find会对顶点进行更新操作
    u = find(u as number, parent)
    v = find(v as number, parent)

    // WHY: union 会将顶点 uv 构成的边添加进parent数组中
    if (union(u, v, parent))
      ne++

    // 已经处理过当前边，那么就将其权值置为 INF，防止下次循环继续选择该边
    cost[a as number][b as number] = cost[b as number][a as number] = INF
  }

  return parent
}
