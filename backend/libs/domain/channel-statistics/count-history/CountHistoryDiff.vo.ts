import { IsInt } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo'

/** 期間内の増減（マイナスあり） */
export class CountHistoryDiff extends NumberValueObject {
  @IsInt()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
