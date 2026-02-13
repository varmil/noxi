import { IsString, MaxLength } from 'class-validator'
import { StringValueObject } from '@domain/lib'
import { TIER_CONFIG, TierValue } from './Tier.vo'

/**
 * ハイパーチャットのメッセージ
 * Tierに応じた文字数制限を検証する
 * 空文字も許可（無言スパチャ）
 */
export class Message extends StringValueObject {
  @IsString()
  @MaxLength(300) // max tier の最大文字数
  protected readonly val: string

  constructor(val: string, tier?: TierValue) {
    val = val.trim()
    super(val)
    this.val = val

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
