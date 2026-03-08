import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { GroupId } from '@domain/group'

export class GetChannelSupersRankingsDto {
  @IsIn(['weekly', 'monthly'])
  period: 'weekly' | 'monthly'

  @IsOptional()
  @IsString()
  group?: string

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  limit?: number

  toCurrentDate(): Date {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    if (this.period === 'monthly') {
      return new Date(Date.UTC(year, month, 1, -9))
    }

    return new Date(Date.UTC(year, month, day, -9))
  }

  toPreviousDate(): Date {
    const now = new Date()
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    const year = jstNow.getUTCFullYear()
    const month = jstNow.getUTCMonth()
    const day = jstNow.getUTCDate()

    if (this.period === 'monthly') {
      return new Date(Date.UTC(year, month - 1, 1, -9))
    }

    return new Date(Date.UTC(year, month, day - 7, -9))
  }

  toGroupId(): GroupId | undefined {
    return this.group ? new GroupId(this.group) : undefined
  }
}
