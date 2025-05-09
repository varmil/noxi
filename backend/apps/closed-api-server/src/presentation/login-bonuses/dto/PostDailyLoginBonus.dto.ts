import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'
import { UserId } from '@domain/user'

export class PostDailyLoginBonus {
  @IsInt()
  @Type(() => Number)
  userId: number

  toUserId = () => new UserId(this.userId)
}
