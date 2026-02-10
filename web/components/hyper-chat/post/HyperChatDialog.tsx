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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { useIsMD } from '@/hooks/use-media-query'
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
  const isDesktop = useIsMD()
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

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
    if (!nextOpen) {
      // 支払いに成功した場合はUI更新（フォールバック: バックエンドのWebhook処理が遅延した場合の保険）
      if (step === 'complete') {
        setTimeout(async () => {
          await revalidateHyperChat(channelId)
        }, 600)
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

  // --- Shared step content ---

  const inputStepBody = (
    <>
      <div className="space-y-10 pb-6">
        <Form {...form}>
          <MessageInput control={form.control} maxChars={maxChars} />
        </Form>

        <TierSlider
          selectedTier={selectedTier}
          onTierChange={handleTierChange}
          onSelectFree={handleSwitchToFreeMode}
          hasTicket={!isLoadingTickets && tickets.length > 0}
          ticketCount={tickets.length}
          isTicketMode={mode === 'free'}
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => handleClose(false)}
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
  )

  const completeStepBody = (
    <>
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
        <Button onClick={() => handleClose(false)}>{t('dialog.close')}</Button>
      </div>
    </>
  )

  // --- Desktop: Dialog ---

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className="sm:max-w-md"
          onOpenAutoFocus={e => e.preventDefault()}
        >
          {step === 'input' && (
            <>
              <DialogHeader>
                <DialogTitle className="mr-10 leading-normal">
                  {t('dialog.title', { channel: channelTitle })}
                </DialogTitle>
                <DialogDescription>{t('dialog.description')}</DialogDescription>
              </DialogHeader>
              {inputStepBody}
            </>
          )}

          {step === 'payment' && clientSecret && (
            <Elements stripe={stripePromise} options={elementsOptions}>
              <PaymentForm
                price={price}
                onSuccess={handlePaymentSuccess}
                onBack={handleBack}
                isDesktop
              />
            </Elements>
          )}

          {step === 'complete' && (
            <>
              <DialogHeader>
                <DialogTitle>{t('dialog.complete.title')}</DialogTitle>
              </DialogHeader>
              {completeStepBody}
            </>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  // --- Mobile: Sheet (bottom) ---

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="h-full"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {step === 'input' && (
          <>
            <SheetHeader>
              <SheetTitle className="mr-10">
                {t('dialog.title', { channel: channelTitle })}
              </SheetTitle>
              <SheetDescription>{t('dialog.description')}</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4">{inputStepBody}</div>
          </>
        )}

        {step === 'payment' && clientSecret && (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <PaymentForm
              price={price}
              onSuccess={handlePaymentSuccess}
              onBack={handleBack}
              isDesktop={false}
            />
          </Elements>
        )}

        {step === 'complete' && (
          <>
            <SheetHeader>
              <SheetTitle>{t('dialog.complete.title')}</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-4">{completeStepBody}</div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
