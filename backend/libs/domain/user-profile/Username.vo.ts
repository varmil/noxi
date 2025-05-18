import { IsNotEmpty, Length, Matches } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'

export class Username extends StringValueObject {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'ユーザー名は英数字とアンダースコアのみ使用できます'
  })
  @Length(3, 20, {
    message: 'ユーザー名は3〜20文字である必要があります'
  })
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
