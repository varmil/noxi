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
import { Input } from '@/components/ui/input'
import {
  MAX_NAME_LENGTH,
  ProfileFormSchema
} from 'features/dashboard/profile/hooks/useProfileSchema'

export const NameInput = () => {
  const { control, watch } = useFormContext<ProfileFormSchema>()
  const feat = useTranslations('Features.dashboard.profile.form')
  const name = watch('name')

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="w-full flex items-center justify-between">
              <span>{feat('name')}</span>
              <span className="text-sm text-muted-foreground">
                {name.length} / {MAX_NAME_LENGTH}
              </span>
            </div>
          </FormLabel>
          <FormControl>
            <Input id="name" {...field} maxLength={MAX_NAME_LENGTH} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
