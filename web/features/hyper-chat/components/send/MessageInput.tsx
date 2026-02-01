'use client'

import { useTranslations } from 'next-intl'
import { Control, useWatch } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

type FormValues = {
  message: string
}

type Props = {
  control: Control<FormValues>
  maxChars: number
}

export function MessageInput({ control, maxChars }: Props) {
  const t = useTranslations('Features.hyperChat.dialog')
  const message = useWatch({ control, name: 'message' })
  const charCount = message?.length ?? 0

  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="w-full flex items-center justify-between">
              <span>{t('messageLabel')}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {t('charCount', { current: charCount, max: maxChars })}
              </span>
            </div>
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              onChange={e => {
                const newValue = e.target.value
                if (newValue.length <= maxChars) {
                  field.onChange(newValue)
                }
              }}
              placeholder={t('messagePlaceholder')}
              className="min-h-[100px] max-h-[280px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
