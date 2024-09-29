import { Collection } from '@domain/lib/Collection'
import { ChatCount, Count } from '@domain/stream-stats'
import { PublishedAt, VideoId } from '@domain/youtube'

type ACC = Record<
  string,
  {
    all: Count
    member: Count
    videoId: VideoId
    date: Date
    minuteKey: string
  }
>

export class ChatCounts extends Collection<ChatCount> {
  constructor(protected readonly list: ChatCount[]) {
    super(list)
  }

  /** 1分単位でレコードをグループ化 */
  bundle() {
    const groupedByMinute = this.list.reduce((acc: ACC, chat) => {
      // 秒とミリ秒をリセットし、1分単位にまとめる
      const date = new Date(chat.createdAt)
      date.setSeconds(0)
      date.setMilliseconds(0)

      const minuteKey = date.toISOString().slice(0, 16).replace('T', ' ')

      if (!acc[minuteKey]) {
        acc[minuteKey] = {
          all: new Count(0),
          member: new Count(0),
          videoId: chat.videoId,
          date: date,
          minuteKey: minuteKey
        }
      }

      // チャットデータを集計
      acc[minuteKey].all = acc[minuteKey].all.addBy(chat.all)
      acc[minuteKey].member = acc[minuteKey].member.addBy(chat.member)

      return acc
    }, {} as ACC)

    // groupedByMinuteの結果をCollectionで返す
    return new ChatCounts(
      Object.values(groupedByMinute).map(
        e =>
          new ChatCount({
            videoId: e.videoId,
            all: e.all,
            member: e.member,
            latestPublishedAt: new PublishedAt(e.date),
            createdAt: e.date
          })
      )
    )
  }
}
