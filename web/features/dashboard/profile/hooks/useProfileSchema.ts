import { useTranslations } from 'next-intl'
import { z } from 'zod'
import {
  getProfanityFilterForEnglish,
  getProfanityFilterForJapanese,
  isUsernameReserved
} from 'utils/input/input-check'

export const MAX_NAME_LENGTH = 25
export const MIN_USERNAME_LENGTH = 3
export const MAX_USERNAME_LENGTH = 20
export const MAX_BIO_LENGTH = 160

// isProfane が誤検出されるので使わない
const JapaneseFilter = getProfanityFilterForJapanese()
const EnglishFilter = getProfanityFilterForEnglish()

export const useProfileFormSchema = () => {
  const feat = useTranslations('Features.dashboard.profile.form')
  const nameSchema = z
    .string()
    .min(1, feat('required', { type: feat('name') }))
    .max(
      MAX_NAME_LENGTH,
      feat('maxLength', {
        type: feat('name'),
        length: MAX_NAME_LENGTH
      })
    )
    .refine(
      val => {
        const res = JapaneseFilter.checkProfanity(val)
        return !res.containsProfanity && res.profaneWords.length === 0
      },
      val => ({
        message: feat('profanity.title', {
          words: JapaneseFilter.checkProfanity(val).profaneWords.join(', ')
        })
      })
    )

  const usernameSchema = z
    .string()
    .min(MIN_USERNAME_LENGTH, {
      message: feat('minLength', {
        type: feat('username'),
        length: MIN_USERNAME_LENGTH
      })
    })
    .max(
      MAX_USERNAME_LENGTH,
      feat('maxLength', {
        type: feat('username'),
        length: MAX_USERNAME_LENGTH
      })
    )
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: feat('usernameRegex')
    })
    .refine(
      val => {
        const res = EnglishFilter.checkProfanity(val)
        return !res.containsProfanity && res.profaneWords.length === 0
      },
      val => ({
        message: feat('profanity.title', {
          words: EnglishFilter.checkProfanity(val).profaneWords.join(', ')
        })
      })
    )
    .refine(val => !isUsernameReserved(val), feat('usernameReserved'))

  const bioSchema = z
    .string()
    .max(
      MAX_BIO_LENGTH,
      feat('maxLength', { type: feat('bio'), length: MAX_BIO_LENGTH })
    )
    .refine(
      val => {
        const res = JapaneseFilter.checkProfanity(val)
        return !res.containsProfanity && res.profaneWords.length === 0
      },
      val => ({
        message: feat('profanity.title', {
          words: JapaneseFilter.checkProfanity(val).profaneWords.join(', ')
        })
      })
    )

  return z.object({
    name: nameSchema,
    username: usernameSchema,
    bio: bioSchema
  })
}

export type ProfileFormSchema = z.infer<ReturnType<typeof useProfileFormSchema>>
