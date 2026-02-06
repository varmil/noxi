'use client'

import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Loader2, Tickets } from 'lucide-react'
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
import { getMyTickets } from 'apis/hyper-chat-tickets/getMyTickets'
import { TicketSchema } from 'apis/hyper-chat-tickets/ticketSchema'
import { consumeTicket } from 'apis/hyper-chat-tickets/useTicket'
import { createHyperChatPaymentIntent } from 'apis/hyper-chats/createHyperChatPaymentIntent'
import { PaidTierValue, TIER_CONFIG } from 'apis/hyper-chats/hyperChatSchema'
import { revalidateHyperChat } from 'apis/hyper-chats/revalidateHyperChat'
import { useHyperChatForm } from 'hooks/hyper-chat/useHyperChatForm'
import { AnimatedCheckmark } from './AnimatedCheckmark'
import { MessageInput } from './MessageInput'
import { PaymentForm } from './PaymentForm'
import { TierSlider } from './TierSlider'

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
type Mode = 'paid' | 'free'

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
  const [selectedTier, setSelectedTier] = useState<PaidTierValue>('standard')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('input')
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // Ticket mode state
  const [mode, setMode] = useState<Mode>('paid')
  const [tickets, setTickets] = useState<TicketSchema[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(false)

  // Free tier has fixed config
  const activeTier = mode === 'free' ? 'free' : selectedTier
  const { form, message, maxChars } = useHyperChatForm(activeTier)

  // Fetch tickets when dialog opens
  useEffect(() => {
    if (open && session?.user) {
      setIsLoadingTickets(true)
      getMyTickets()
        .then(setTickets)
        .catch(() => setTickets([]))
        .finally(() => setIsLoadingTickets(false))
    }
  }, [open, session])
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

  const handleTierChange = (newTier: PaidTierValue) => {
    setSelectedTier(newTier)
    setMode('paid')
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

  const handleUseTicket = async () => {
    if (!session || tickets.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      await consumeTicket({
        ticketId: tickets[0].id,
        channelId,
        group,
        gender,
        message
      })
      setStep('complete')
    } catch (err) {
      if (err instanceof Error && err.message.includes('moderation')) {
        setError(t('dialog.moderationError'))
      } else {
        setError(t('dialog.error.description'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchToFreeMode = () => {
    setMode('free')
    // Free tier has 60 chars max, truncate if needed
    const freeMaxChars = TIER_CONFIG.free.maxChars
    if (message.length > freeMaxChars) {
      form.setValue('message', message.slice(0, freeMaxChars), {
        shouldValidate: true
      })
    }
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
        setMode('paid')
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
              {/* Tier Slider */}
              <TierSlider
                selectedTier={selectedTier}
                onTierChange={handleTierChange}
                onSelectFree={handleSwitchToFreeMode}
                hasTicket={!isLoadingTickets && tickets.length > 0}
                ticketCount={tickets.length}
                isTicketMode={mode === 'free'}
              />

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
              {mode === 'paid' ? (
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
              ) : (
                <Button
                  onClick={handleUseTicket}
                  disabled={isLoading || !form.formState.isValid}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t('dialog.processing')}
                    </>
                  ) : (
                    <>
                      <Tickets className="mr-2 size-4" />
                      {t('dialog.useTicket')}
                    </>
                  )}
                </Button>
              )}
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
