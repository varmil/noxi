import { useFormatter } from 'next-intl'
import { ChatCountsSchema } from 'apis/youtube/schema/chatCountSchema'
import { FormatForTick } from 'features/stream-stats/hooks/useFormattedDatetime'

/**
 * @deprecated サーバでfetchする際に集計しているのでフロントエンドは何もしない
 * 5分単位でレコードをグループ化
 **/
export const useGroupByMinute = (
  data: ChatCountsSchema
): {
  member: number
  notMember: number
  time: string
}[] => {
  const format = useFormatter()
  const interval = useXAxisInterval(data.length)
  const reduced = data.reduce((acc, chat) => {
    const date = new Date(chat.createdAt)
    const minutes = date.getMinutes()
    const roundedMinutes = Math.floor(minutes / interval) * interval // {interval}分単位に丸める

    // 分を5分単位にセットし、秒とミリ秒を0にリセット
    date.setMinutes(roundedMinutes)
    date.setSeconds(0)
    date.setMilliseconds(0)

    // グループ化キーを 'HH:mm' 形式に変換
    const dateKey = format.dateTime(date, FormatForTick)

    if (!acc[dateKey]) {
      acc[dateKey] = {
        notMember: 0,
        member: 0,
        time: dateKey
      }
    }

    // チャットデータを集計
    acc[dateKey].member += chat.member
    acc[dateKey].notMember += chat.all - chat.member

    return acc
  }, {} as Record<string, any>)

  // reduced の結果を配列として返す
  return Object.values(reduced)
}

/**
 *
 * @param length the length of ChatCountsSchema
 * @returns the minute(s) interval
 */
const useXAxisInterval = (length: number) => {
  switch (true) {
    case length < 120:
      return 1
    case length < 180:
      return 2
    case length < 240:
      return 3
    case length < 300:
      return 4
    default:
      return 5
  }
}
