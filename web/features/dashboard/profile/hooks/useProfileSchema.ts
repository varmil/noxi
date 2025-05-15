import { z } from 'zod'

export const MAX_USERNAME_LENGTH = 25
export const MAX_BIO_LENGTH = 160

export const useProfileFormSchema = () => {
  const ProfileFormSchema = z.object({
    username: z
      .string()
      .min(1, '表示名は必須です')
      .max(
        MAX_USERNAME_LENGTH,
        `表示名は${MAX_USERNAME_LENGTH}文字以内で入力してください`
      ),
    bio: z
      .string()
      .max(
        MAX_BIO_LENGTH,
        `自己紹介は${MAX_BIO_LENGTH}文字以内で入力してください`
      )
  })

  return ProfileFormSchema
}

export type ProfileFormSchema = z.infer<ReturnType<typeof useProfileFormSchema>>
