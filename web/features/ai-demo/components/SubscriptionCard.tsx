'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { postFeatureInterest } from 'apis/feature-interests/postFeatureInterest'

type Props = {
  featureId: string
}

export default function SubscriptionCard({ featureId }: Props) {
  const t = useTranslations('Features.aiDemo.subscriptionCard')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await postFeatureInterest({
        featureId,
        comment: comment || undefined
      })
      setSubmitted(true)
    } catch {
      // silently fail for demo
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border">
        <CardContent className="flex flex-col items-center gap-2 py-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-green-500">
            <Check className="size-5 text-white" />
          </div>
          <p className="font-medium">{t('thanks')}</p>
          <p className="text-sm text-muted-foreground">{t('thanksDetail')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden border">
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{t('title')}</CardTitle>
        </div>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div className="rounded-lg bg-muted/50 p-3 text-sm">
          <p className="font-medium">{t('priceLabel')}</p>
          <p className="mt-1 text-2xl font-bold">
            ¥660
            <span className="text-sm font-normal text-muted-foreground">
              {t('perMonth')}
            </span>
          </p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>✓ {t('feature1')}</li>
            <li>✓ {t('feature2')}</li>
            <li>✓ {t('feature3')}</li>
          </ul>
        </div>
        <Textarea
          placeholder={t('commentPlaceholder')}
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
          className="resize-none"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-4xl"
          size="lg"
        >
          {loading ? t('submitting') : t('cta')}
        </Button>
      </CardContent>
    </Card>
  )
}
