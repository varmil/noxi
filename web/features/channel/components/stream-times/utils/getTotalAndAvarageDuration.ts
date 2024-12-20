import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import dayjs from 'lib/dayjs'

export const getTotalAndAvarageDuration = (streams: StreamsSchema) => {
  // 合計配信時間と配信数を計算
  let totalDuration = dayjs.duration(0) // 合計時間
  let validStreams = 0 // 有効な配信数

  streams.forEach(stream => {
    const {
      streamTimes: { actualStartTime, actualEndTime }
    } = stream

    const duration = stream.duration ? dayjs.duration(stream.duration) : null

    const durationFromStreamTimes =
      actualStartTime && actualEndTime
        ? dayjs(actualEndTime).diff(dayjs(actualStartTime), 'millisecond')
        : null

    const streamDuration =
      duration ||
      (durationFromStreamTimes ? dayjs.duration(durationFromStreamTimes) : null)

    if (streamDuration) {
      totalDuration = totalDuration.add(streamDuration)
      validStreams++
    }
  })

  // 平均配信時間を計算
  const averageDuration =
    validStreams > 0
      ? dayjs.duration(totalDuration.clone().asMilliseconds() / validStreams)
      : dayjs.duration(0)

  return {
    totalDuration,
    averageDuration
  }
}
