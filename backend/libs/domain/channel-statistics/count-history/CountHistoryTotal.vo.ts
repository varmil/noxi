import { IsInt } from 'class-validator'
import { NumberValueObject } from '@domain/lib/vo'

/** 期間末のcount */
export class CountHistoryTotal extends NumberValueObject {
  @IsInt()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}
