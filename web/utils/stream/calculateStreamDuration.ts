import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import dayjs from 'lib/dayjs'

/**
 * 配信データから合計配信時間と平均配信時間を計算
 */
export const getTotalAndAverageDuration = (streams: StreamsSchema) => {
  let totalDuration = dayjs.duration(0)
  let validStreams = 0

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

  const averageDuration =
    validStreams > 0
      ? dayjs.duration(totalDuration.clone().asMilliseconds() / validStreams)
      : dayjs.duration(0)

  return {
    totalDuration,
    averageDuration
  }
}
