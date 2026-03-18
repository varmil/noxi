import { IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

/** 週の開始日（ISO 8601 文字列） */
export class Week extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string

  constructor(val: string | Date) {
    const str = val instanceof Date ? val.toISOString() : val
    super(str)
    this.val = str
  }
}
