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
export const MAX_WEBSITE_LENGTH = 2048

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
        length: MAX_NAME_LENGTH.toString()
      })
    )
    .refine(
      val => {
        const res = JapaneseFilter.checkProfanity(val)
        return !res.containsProfanity && res.profaneWords.length === 0
      },
      {
        message: feat('profanity.title', { words: '' })
      }
    )

  const usernameSchema = z
    .string()
    .min(MIN_USERNAME_LENGTH, {
      message: feat('minLength', {
        type: feat('username'),
        length: MIN_USERNAME_LENGTH.toString()
      })
    })
    .max(
      MAX_USERNAME_LENGTH,
      feat('maxLength', {
        type: feat('username'),
        length: MAX_USERNAME_LENGTH.toString()
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
      {
        message: feat('profanity.title', { words: '' })
      }
    )
    .refine(val => !isUsernameReserved(val), feat('usernameReserved'))

  const bioSchema = z
    .string()
    .max(
      MAX_BIO_LENGTH,
      feat('maxLength', {
        type: feat('bio'),
        length: MAX_BIO_LENGTH.toString()
      })
    )
    .refine(
      val => {
        const res = JapaneseFilter.checkProfanity(val)
        return !res.containsProfanity && res.profaneWords.length === 0
      },
      {
        message: feat('profanity.title', { words: '' })
      }
    )

  const websiteSchema = z
    .string()
    .max(
      MAX_WEBSITE_LENGTH,
      feat('maxLength', {
        type: feat('website'),
        length: MAX_WEBSITE_LENGTH.toString()
      })
    )
    .refine(
      val => {
        if (val === '') return true
        try {
          const url = new URL(val)
          return url.protocol === 'https:'
        } catch {
          return false
        }
      },
      { message: feat('websiteInvalid') }
    )

  return z.object({
    name: nameSchema,
    username: usernameSchema,
    bio: bioSchema,
    website: websiteSchema
  })
}

export type ProfileFormSchema = z.infer<ReturnType<typeof useProfileFormSchema>>
