import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StringValueObject } from '@domain/lib'

export const TIERS = ['free', 'lite', 'standard', 'premium', 'special'] as const
export type TierValue = (typeof TIERS)[number]

export const TIER_CONFIG = {
  free: { price: 0, maxChars: 60 },
  lite: { price: 300, maxChars: 140 },
  standard: { price: 1000, maxChars: 300 },
  premium: { price: 3000, maxChars: 500 },
  special: { price: 10000, maxChars: 1000 }
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
}
