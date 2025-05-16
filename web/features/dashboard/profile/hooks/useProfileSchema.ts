import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const MAX_USERNAME_LENGTH = 25
export const MAX_BIO_LENGTH = 160

export const useProfileFormSchema = () => {
  const feat = useTranslations('Features.dashboard.profile.form')
  const ProfileFormSchema = z.object({
    username: z
      .string()
      .min(1, feat('required', { type: feat('username') }))
      .max(
        MAX_USERNAME_LENGTH,
        feat('maxLength', {
          type: feat('username'),
          length: MAX_USERNAME_LENGTH
        })
      ),
    bio: z
      .string()
      .max(
        MAX_BIO_LENGTH,
        feat('maxLength', { type: feat('bio'), length: MAX_BIO_LENGTH })
      )
  })

  return ProfileFormSchema
}

export type ProfileFormSchema = z.infer<ReturnType<typeof useProfileFormSchema>>
