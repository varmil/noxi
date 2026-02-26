'use client'

import { Link2 } from 'lucide-react'
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
import { ProfileFormSchema } from 'features/dashboard/profile/hooks/useProfileSchema'

export const WebsiteInput = () => {
  const { control } = useFormContext<ProfileFormSchema>()
  const feat = useTranslations('Features.dashboard.profile.form')

  return (
    <FormField
      control={control}
      name="website"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex items-center gap-1">
              <Link2 className="size-4" />
              <span>{feat('website')}</span>
            </div>
          </FormLabel>
          <FormControl>
            <Input
              id="website"
              type="url"
              placeholder="https://www.youtube.com/@abc123"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
