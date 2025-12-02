import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

type MetricKey = 'peakConcurrentViewers' | 'avgConcurrentViewers'

/**
 * 配信データから指定されたメトリクスの中央値を計算
 */
export const calculateMedian = (
  streams: StreamsSchema,
  metricKey: MetricKey = 'peakConcurrentViewers'
): number | undefined => {
  const values = streams
    .map(s => s.metrics[metricKey])
    .filter(v => typeof v === 'number')

  if (values.length === 0) return undefined

  values.sort((a, b) => a - b)
  const mid = Math.floor(values.length / 2)

  return values.length % 2 !== 0
    ? values[mid]
    : (values[mid - 1] + values[mid]) / 2
}

/**
 * 配信データから指定されたメトリクスの最大値を計算
 */
export const calculateMax = (
  streams: StreamsSchema,
  metricKey: MetricKey = 'peakConcurrentViewers'
): number | undefined => {
  const values = streams
    .map(s => s.metrics[metricKey])
    .filter(v => typeof v === 'number')

  if (values.length === 0) return undefined

  return Math.max(...values)
}

/**
 * 配信データから指定されたメトリクスの最小値を計算
 */
export const calculateMin = (
  streams: StreamsSchema,
  metricKey: MetricKey = 'peakConcurrentViewers'
): number | undefined => {
  const values = streams
    .map(s => s.metrics[metricKey])
    .filter(v => typeof v === 'number')

  if (values.length === 0) return undefined

  return Math.min(...values)
}
