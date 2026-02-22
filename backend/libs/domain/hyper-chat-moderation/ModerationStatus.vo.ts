import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export const MODERATION_STATUSES = ['warn', 'ban'] as const
export type ModerationStatusValue = (typeof MODERATION_STATUSES)[number]

export class ModerationStatus extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsIn(MODERATION_STATUSES)
  protected readonly val: ModerationStatusValue

  constructor(val: ModerationStatusValue) {
    super(val)
    this.val = val
  }

  isWarn(): boolean {
    return this.val === 'warn'
  }

  isBan(): boolean {
    return this.val === 'ban'
  }
}
