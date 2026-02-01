'use client'

import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createHyperChatPaymentIntent } from 'apis/hyper-chats/createHyperChatPaymentIntent'
import { TIER_CONFIG, TierValue, TIERS } from 'apis/hyper-chats/hyperChatSchema'
import { revalidateHyperChat } from 'apis/hyper-chats/revalidateHyperChat'
import { useHyperChatForm } from 'features/hyper-chat/hooks/useHyperChatForm'
import { AnimatedCheckmark } from './AnimatedCheckmark'
import { MessageInput } from './MessageInput'
import { PaymentForm } from './PaymentForm'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  channelId: string
  channelTitle: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
}

type Step = 'input' | 'payment' | 'complete'

export function HyperChatDialog({
  open,
  onOpenChange,
  channelId,
  channelTitle,
  group,
  gender
}: Props) {
  const { data: session } = useSession()
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Features.hyperChat')
  const [selectedTier, setSelectedTier] = useState<TierValue>('standard')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('input')
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const { form, message, maxChars } = useHyperChatForm(selectedTier)
  const price = TIER_CONFIG[selectedTier].price

  const handleProceedToPayment = async () => {
    if (!session) {
      setError(t('dialog.loginRequired.description'))
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await createHyperChatPaymentIntent({
        channelId,
        group,
        gender,
        tier: selectedTier,
        message
      })

      setClientSecret(result.clientSecret)
      setStep('payment')
    } catch (err) {
      // Server-side moderation error
      if (err instanceof Error && err.message.includes('moderation')) {
        setError(t('dialog.moderationError'))
      } else {
        setError(t('dialog.error.description'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTierChange = (value: string) => {
    const newTier = value as TierValue
    setSelectedTier(newTier)
    const newMaxChars = TIER_CONFIG[newTier].maxChars
    if (message.length > newMaxChars) {
      form.setValue('message', message.slice(0, newMaxChars), {
        shouldValidate: true
      })
    } else {
      form.trigger('message')
    }
  }

  const handlePaymentSuccess = async () => {
    setStep('complete')
  }

  const handleBack = () => {
    setStep('input')
    setClientSecret(null)
  }

  const handleDialogClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) {
      // 支払いに成功した場合はUI更新
      if (step === 'complete') {
        setTimeout(async () => {
          await revalidateHyperChat(channelId)
        }, 300)
      }

      // Delay reset to prevent UI flicker during close animation
      setTimeout(() => {
        setStep('input')
        setClientSecret(null)
        form.reset()
        setSelectedTier('standard')
        setError(null)
      }, 200)
    }
  }

  const elementsOptions: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: resolvedTheme === 'dark' ? 'night' : 'stripe',
      variables: {
        borderRadius: '8px'
      }
    },
    locale: 'ja'
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'input' && (
          <>
            <DialogHeader>
              <DialogTitle>
                {t('dialog.title', { channel: channelTitle })}
              </DialogTitle>
              <DialogDescription>{t('dialog.description')}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Tier Selection */}
              <div className="space-y-2">
                <Label>Tier</Label>
                <RadioGroup
                  value={selectedTier}
                  onValueChange={handleTierChange}
                  className="grid grid-cols-3 gap-2"
                >
                  {TIERS.map(tier => (
                    <div key={tier}>
                      <RadioGroupItem
                        value={tier}
                        id={tier}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={tier}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <span className="font-semibold">
                          {t(`dialog.tier.${tier}`)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t('dialog.price', {
                            price: TIER_CONFIG[tier].price.toLocaleString()
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t('dialog.maxChars', {
                            count: TIER_CONFIG[tier].maxChars
                          })}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Message Input */}
              <Form {...form}>
                <MessageInput control={form.control} maxChars={maxChars} />
              </Form>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => handleDialogClose(false)}
                disabled={isLoading}
              >
                {t('dialog.cancel')}
              </Button>
              <Button
                onClick={handleProceedToPayment}
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t('dialog.processing')}
                  </>
                ) : (
                  t('dialog.payButton', { price: price.toLocaleString() })
                )}
              </Button>
            </div>
          </>
        )}

        {step === 'payment' && clientSecret && (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <PaymentForm
              price={price}
              onSuccess={handlePaymentSuccess}
              onBack={handleBack}
            />
          </Elements>
        )}

        {step === 'complete' && (
          <>
            <DialogHeader>
              <DialogTitle>{t('dialog.complete.title')}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center py-8">
              <div className="mx-auto size-20 flex items-center justify-center rounded-full mb-8">
                <AnimatedCheckmark className="size-20" />
              </div>
              <p className="text-lg font-bold">THANK YOU !!</p>
              <p className="text-center text-muted-foreground">
                {t('dialog.complete.description')}
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleDialogClose(false)}>
                {t('dialog.close')}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
