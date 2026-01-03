import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'

export class GetGoldenTimesDto {
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

    // JST 今日 00:00:00（昨日の終わりまで含める = 今日を含まない）
    // 曜日別データのため、今日を含むと時間帯によって特定曜日のデータが不完全になるため除外
    const lt = new Date(Date.UTC(year, month, day, -9))
    // JST (今日 - days日) 00:00:00
    const gte = new Date(Date.UTC(year, month, day - this.days, -9))

    return { gte, lt }
  }

  toGroupId(): GroupId | undefined {
    return this.group ? new GroupId(this.group) : undefined
  }
}
