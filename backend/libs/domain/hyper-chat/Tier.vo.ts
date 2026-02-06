import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export const TIERS = ['free', 'lite', 'standard', 'max'] as const
export type TierValue = (typeof TIERS)[number]

export const TIER_CONFIG = {
  free: { price: 0, maxChars: 60, rotationSlots: 1 },
  lite: { price: 300, maxChars: 60, rotationSlots: 1 },
  standard: { price: 1000, maxChars: 140, rotationSlots: 4 },
  max: { price: 10000, maxChars: 300, rotationSlots: 60 }
} as const

export class Tier extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @IsIn(TIERS)
  protected readonly val: TierValue

  constructor(val: TierValue) {
    super(val)
    this.val = val
  }

  getPrice(): number {
    return TIER_CONFIG[this.val].price
  }

  getMaxChars(): number {
    return TIER_CONFIG[this.val].maxChars
  }

  getRotationSlots(): number {
    return TIER_CONFIG[this.val].rotationSlots
  }
}
