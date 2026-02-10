'use client'

import { useTranslations } from 'next-intl'
import { Control, useWatch } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
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
              // X参考：128px - 284px
              className="min-h-[128px] max-h-[284px] field-sizing-content"
            />
          </FormControl>
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {t('charCount', { current: charCount, max: maxChars })}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
