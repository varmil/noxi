import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'

export class GetChannelGrowthRankingsDto {
  @IsOptional()
  @IsIn(['weekly', 'monthly'])
  period?: 'weekly' | 'monthly'

  @IsOptional()
  @IsNumber()
  @IsIn([7, 28, 90])
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  days?: number

  @IsOptional()
  @IsString()
  group?: string

  @IsOptional()
  @IsIn(['diff', 'rate'])
  orderBy?: 'diff' | 'rate'

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  limit?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  minSubscriberCount?: number

  toDateRange(): { gte: Date; lt: Date } {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    if (this.period === 'monthly') {
      // 前月1日 00:00 JST 〜 当月1日 00:00 JST
      const lt = new Date(Date.UTC(year, month, 1, -9))
      const gte = new Date(Date.UTC(year, month - 1, 1, -9))
      return { gte, lt }
    }

    if (this.period === 'weekly') {
      // 今日を含まない過去7日間（例: 3/1実行 → 2/22〜2/28）
      const lt = new Date(Date.UTC(year, month, day, -9))
      const gte = new Date(Date.UTC(year, month, day - 7, -9))
      return { gte, lt }
    }

    // period 未指定時は days で計算（後方互換）
    const days = this.days ?? 28
    const lt = new Date(Date.UTC(year, month, day, -9))
    const gte = new Date(Date.UTC(year, month, day - days, -9))
    return { gte, lt }
  }

  toGroupId(): GroupId | undefined {
    return this.group ? new GroupId(this.group) : undefined
  }
}
