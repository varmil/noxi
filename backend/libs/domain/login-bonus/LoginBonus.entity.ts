import { Exclude, Transform } from 'class-transformer'
import { LastClaimedAt } from '@domain/cheer-ticket'
import { UserId } from '@domain/user'

/** ログインボーナスのチケットタイプ */
export const TICKET_TYPE = 'dailyLoginBonus'
/** デイリーログインボーナスのチケット数 */
export const AWARD = 3

export class LoginBonus {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId
  @Transform(({ value }: { value: LastClaimedAt }) => value.get())
  public readonly lastClaimedAt: LastClaimedAt

  constructor(args: { userId: UserId; lastClaimedAt: LastClaimedAt }) {
    this.userId = args.userId
    this.lastClaimedAt = args.lastClaimedAt
  }

  /** 20時間経っていればtrue */
  @Exclude()
  canClaimDaily(): boolean {
    const JST_OFFSET_MINUTES = 9 * 60 // JSTはUTC+9
    const now = new Date()
    const claimedAt = this.lastClaimedAt.get()

    // JSTでの「基準日（朝5時境目）」を算出するための関数
    const toJST5amBoundary = (date: Date): string => {
      const jstDate = new Date(date.getTime() + JST_OFFSET_MINUTES * 60 * 1000)
      const year = jstDate.getFullYear()
      const month = jstDate.getMonth()
      const day = jstDate.getDate()

      // JSTのその日 5時の UTC 時刻を求める（＝JST日付の日付5時 → UTCに戻す）
      const jst5am = new Date(Date.UTC(year, month, day, 5, 0, 0))
      return jst5am.toISOString()
    }

    const nowBoundaryKey = toJST5amBoundary(now)
    const claimedBoundaryKey = toJST5amBoundary(claimedAt)

    console.log({
      nowBoundaryKey,
      claimedBoundaryKey
    })
    return nowBoundaryKey !== claimedBoundaryKey
  }
}
