import { BadRequestException } from '@nestjs/common'
import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { NumberValueObject } from '@domain/lib'

export class UserId extends NumberValueObject {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  protected readonly val: number

  constructor(val: string | number) {
    const num = Number(val)
    if (isNaN(num)) {
      throw new BadRequestException('Invalid user ID: Is it number ?')
    }
    super(num)
    this.val = num
  }
}

/** 匿名ユーザーのID */
export const AnonymousUserId = new UserId(9999999)
