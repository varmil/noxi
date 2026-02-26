import { IsString, MaxLength } from 'class-validator'
import { StringValueObject } from '@domain/lib'
import { TIER_CONFIG, TierValue } from './Tier.vo'

/**
 * ハイパーチャットのメッセージ
 * Tierに応じた文字数制限を検証する
 * 有料tierは空文字許可（無言スパチャ）、無料tierは1文字以上必須
 */
export class Message extends StringValueObject {
  @IsString()
  @MaxLength(1000) // special tier の最大文字数
  protected readonly val: string

  constructor(val: string, tier?: TierValue) {
    val = val.trim()
    super(val)
    this.val = val

    // 無料チケットの場合は空文字を禁止
    if (tier === 'free' && val.length === 0) {
      throw new TypeError(
        'Message is required for free tier'
      )
    }

    // Tierが指定されている場合、その文字数制限を検証
    if (tier) {
      const maxChars = TIER_CONFIG[tier].maxChars
      if (val.length > maxChars) {
        throw new TypeError(
          `Message exceeds max length for tier ${tier}: ${val.length} > ${maxChars}`
        )
      }
    }
  }
}
