import { Exclude, Transform } from 'class-transformer'
import { LastClaimedAt } from '@domain/cheer-ticket'
import { UserId } from '@domain/user'

/** ログインボーナスのチケットタイプ */
export const TICKET_TYPE = 'dailyLoginBonus'
/** デイリーログインボーナスのチケット数 */
export const AWARD = 4

export class LoginBonus {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId
  @Transform(({ value }: { value: LastClaimedAt }) => value.get())
  public readonly lastClaimedAt: LastClaimedAt

  constructor(args: { userId: UserId; lastClaimedAt: LastClaimedAt }) {
    this.userId = args.userId
    this.lastClaimedAt = args.lastClaimedAt
  }

  @Exclude()
  canClaimDaily(): boolean {
    const JST_OFFSET_MINUTES = 9 * 60 // JSTはUTC+9
    const now = new Date()
    const claimedAt = this.lastClaimedAt.get()

    // JSTの朝5時を基準にした日付キー（yyyy-mm-dd）を返す
    const getJst5amDayKey = (date: Date): string => {
      // JST時刻を生成
      const jstTime = new Date(date.getTime() + JST_OFFSET_MINUTES * 60 * 1000)

      // JSTでの "基準日" を出す。朝5時未満なら「前日」とする
      const year = jstTime.getFullYear()
      const month = jstTime.getMonth()
      const day = jstTime.getDate()
      const hour = jstTime.getHours()

      const adjustedDate =
        hour < 5
          ? new Date(Date.UTC(year, month, day - 1, 0, 0, 0))
          : new Date(Date.UTC(year, month, day, 0, 0, 0))

      return adjustedDate.toISOString().split('T')[0] // yyyy-mm-dd 形式
    }

    const nowKey = getJst5amDayKey(now)
    const claimedKey = getJst5amDayKey(claimedAt)
    return nowKey !== claimedKey
  }
}
