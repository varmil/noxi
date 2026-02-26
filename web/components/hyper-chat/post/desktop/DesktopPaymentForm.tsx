'use client'

import { useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type Props = {
  price: number
  onSuccess: () => void
  onBack: () => void
}

export function DesktopPaymentForm({ price, onSuccess, onBack }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const t = useTranslations('Features.hyperChat')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || t('dialog.error.description'))
      setIsProcessing(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })

    if (confirmError) {
      setError(confirmError.message || t('dialog.error.description'))
      setIsProcessing(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{t('dialog.payment.title')}</DialogTitle>
        <DialogDescription>{t('dialog.payment.description')}</DialogDescription>
      </DialogHeader>

      <div className="py-4 min-h-[200px] relative overflow-hidden">
        {!isReady && (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}
        <div className={isReady ? '' : 'invisible absolute'}>
          <PaymentElement
            options={{ layout: 'tabs' }}
            onReady={() => setIsReady(true)}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive text-center mb-4">{error}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isProcessing}
        >
          <ArrowLeft className="mr-2 size-4" />
          {t('dialog.back')}
        </Button>
        <Button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {t('dialog.processing')}
            </>
          ) : (
            t('dialog.confirmPayment', { price })
          )}
        </Button>
      </div>
    </form>
  )
}
