'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createGroupRegistration } from 'apis/groups'
import { ImagePreview } from './ImagePreview'

// Group ID validation schema based on requirements
const groupRegistrationSchema = z.object({
  groupId: z
    .string()
    .min(1, 'Group IDは必須です')
    .regex(
      /^[a-z0-9-]+$/,
      'Group IDは小文字の英数字とハイフンのみ使用できます'
    ),
  name: z.string().min(1, 'Group名は必須です'),
  iconSrc: z.string().min(1, 'アイコンURLは必須です')
})

type GroupRegistrationFormData = z.infer<typeof groupRegistrationSchema>

export function GroupRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('Components.groupRegistrationForm')

  const form = useForm<GroupRegistrationFormData>({
    resolver: zodResolver(groupRegistrationSchema),
    defaultValues: {
      groupId: '',
      name: '',
      iconSrc: ''
    }
  })

  const onSubmit = async (data: GroupRegistrationFormData) => {
    setIsSubmitting(true)
    try {
      await createGroupRegistration({
        groupId: data.groupId,
        name: data.name,
        iconSrc: data.iconSrc
      })

      toast.success(t('submitSuccess'))
      form.reset()
    } catch (error) {
      console.error('Group registration error:', error)
      toast.error(t('submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchedIconSrc = form.watch('iconSrc')

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('groupIdLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('groupIdPlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('groupIdDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('namePlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('nameDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iconSrc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('iconSrcLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('iconSrcPlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('iconSrcDescription')}</FormDescription>
                  <FormMessage />
                  {watchedIconSrc && (
                    <div className="mt-4">
                      <ImagePreview
                        src={watchedIconSrc}
                        alt={form.watch('name') || 'Group icon'}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('submitting') : t('submitButton')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
