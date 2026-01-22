import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'

export class GetStreamVolumeTrendsDto {
  @IsNumber()
  @IsIn([7, 28, 90])
  @Transform(({ value }) => Number(value))
  days = 28

  @IsOptional()
  @IsString()
  group?: string

  toDateRange(): { gte: Date; lt: Date } {
    // 日本時間（JST = UTC+9）基準で日付範囲を計算
    // JST 00:00:00 = UTC 前日 15:00:00
    const now = new Date()
    // UTC時刻に9時間足してJSTの日付を取得
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    // JST 明日 00:00:00（今日の終わりまで含める）= UTC で -9時間
    const lt = new Date(Date.UTC(year, month, day + 1, -9))
    // JST (明日 - days日) 00:00:00
    const gte = new Date(Date.UTC(year, month, day + 1 - this.days, -9))

    return { gte, lt }
  }

  toGroupId(): GroupId | undefined {
    return this.group ? new GroupId(this.group) : undefined
  }
}
