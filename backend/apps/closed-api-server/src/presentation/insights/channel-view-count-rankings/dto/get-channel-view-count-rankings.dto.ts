import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'

export class GetChannelViewCountRankingsDto {
  @IsOptional()
  @IsIn(['weekly', 'monthly'])
  period?: 'weekly' | 'monthly'

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  days?: number

  @IsOptional()
  @IsString()
  group?: string

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  limit?: number

  toDateRange(): { gte: Date; lt: Date } {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    if (this.period === 'monthly') {
      const lt = new Date(Date.UTC(year, month, 1, -9))
      const gte = new Date(Date.UTC(year, month - 1, 1, -9))
      return { gte, lt }
    }

    if (this.period === 'weekly') {
      const lt = new Date(Date.UTC(year, month, day, -9))
      const gte = new Date(Date.UTC(year, month, day - 7, -9))
      return { gte, lt }
    }

    const days = this.days ?? 28
    const lt = new Date(Date.UTC(year, month, day, -9))
    const gte = new Date(Date.UTC(year, month, day - days, -9))
    return { gte, lt }
  }

  toGroupId(): GroupId | undefined {
    return this.group ? new GroupId(this.group) : undefined
  }
}
