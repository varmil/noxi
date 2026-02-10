'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  MAX_BIO_LENGTH,
  ProfileFormSchema
} from 'features/dashboard/profile/hooks/useProfileSchema'

export const BioTextarea = () => {
  const { control, watch } = useFormContext<ProfileFormSchema>()
  const feat = useTranslations('Features.dashboard.profile.form')
  const bio = watch('bio')

  return (
    <FormField
      control={control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="w-full flex items-center justify-between">
              <span>{feat('bio')}</span>
              <span className="text-sm text-muted-foreground">
                {bio.length} / {MAX_BIO_LENGTH}
              </span>
            </div>
          </FormLabel>
          <FormControl>
            <Textarea
              id="bio"
              {...field}
              maxLength={MAX_BIO_LENGTH}
              className="min-h-[120px] max-h-[280px] field-sizing-content"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
