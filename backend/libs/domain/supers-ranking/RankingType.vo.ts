import { IsNotEmpty, IsIn } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export class RankingType extends StringValueObject {
  @IsNotEmpty()
  @IsIn(['overall', 'gender', 'group'])
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }

  isOverall() {
    return this.val === 'overall'
  }

  isGender() {
    return this.val === 'gender'
  }

  isGroup() {
    return this.val === 'group'
  }
}
