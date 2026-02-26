import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { TIER_CONFIG, TierValue } from 'apis/hyper-chats/hyperChatSchema'
import { getProfanityFilterForJapanese } from 'utils/input/input-check'

const JapaneseFilter = getProfanityFilterForJapanese()

export const useHyperChatMessageSchema = (tier: TierValue) => {
  const t = useTranslations('Features.hyperChat.dialog')
  const maxChars = TIER_CONFIG[tier].maxChars

  return z
    .string()
    .max(maxChars, t('maxCharsError', { count: maxChars }))
    .superRefine((val, ctx) => {
      if (!val) return // 空文字は許可（無言スパチャ）
      const res = JapaneseFilter.checkProfanity(val)
      if (res.containsProfanity || res.profaneWords.length > 0) {
        ctx.addIssue({
          code: 'custom',
          message: t('profanityError', { words: res.profaneWords.join(', ') })
        })
      }
    })
}
