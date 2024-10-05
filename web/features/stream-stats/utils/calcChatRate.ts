import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import dayjs from 'lib/dayjs'

/**
 * 1分間あたりのチャットメッセージ数を計算
 *
 * actualEndTimeが存在する場合： actualEndTime - actualStartTime
 * actualEndTimeが存在しない場合： now() - actualStartTime
 */
export const calcChatRate = (stream: StreamSchema) => {
  const {
    streamTimes: { actualStartTime, actualEndTime },
    metrics: { chatMessages }
  } = stream

  const startTime = dayjs(actualStartTime)
  const endTime = actualEndTime ? dayjs(actualEndTime) : dayjs()
  const durationInMinutes = endTime.diff(startTime, 'minute')

  const messagesPerMinute = chatMessages / durationInMinutes
  return messagesPerMinute
}
