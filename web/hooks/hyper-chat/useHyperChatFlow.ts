'use client'

import { useEffect, useState } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { getMyTickets } from 'apis/hyper-chat-tickets/getMyTickets'
import { TicketSchema } from 'apis/hyper-chat-tickets/ticketSchema'
import { consumeTicket } from 'apis/hyper-chat-tickets/useTicket'
import { createHyperChatPaymentIntent } from 'apis/hyper-chats/createHyperChatPaymentIntent'
import { getHyperChatsSumAmount } from 'apis/hyper-chats/getHyperChats'
import { PaidTierValue, TIER_CONFIG } from 'apis/hyper-chats/hyperChatSchema'
import { revalidateHyperChat } from 'apis/hyper-chats/revalidateHyperChat'
import { getChannel } from 'apis/youtube/getChannel'
import { useHyperChatForm } from './useHyperChatForm'

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

export type Step = 'input' | 'payment' | 'complete'
export type Mode = 'paid' | 'free'

type Args = {
  open: boolean
  onOpenChange: (open: boolean) => void
  channelId: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
}

/** ハイパーチャット購入時のフローで用いる状態管理/ハンドラなど */
export function useHyperChatFlow({
  open,
  onOpenChange,
  channelId,
  group,
  gender
}: Args) {
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

  // Post target state (fetched when dialog opens)
  const [channelThumbnailUrl, setChannelThumbnailUrl] = useState<string | null>(
    null
  )
  const [totalAmount, setTotalAmount] = useState<number | null>(null)

  // Free tier has fixed config
  const activeTier = mode === 'free' ? 'free' : selectedTier
  const { form, message, maxChars } = useHyperChatForm(activeTier)

  // Fetch tickets and post target info when dialog opens
  useEffect(() => {
    if (open && session?.user) {
      setIsLoadingTickets(true)

      getMyTickets()
        .then(setTickets)
        .catch(() => setTickets([]))
        .finally(() => setIsLoadingTickets(false))

      getChannel(channelId)
        .then(channel => {
          const url =
            channel.basicInfo.thumbnails.high?.url ??
            channel.basicInfo.thumbnails.medium?.url ??
            channel.basicInfo.thumbnails.default?.url
          setChannelThumbnailUrl(url ?? null)
        })
        .catch(() => setChannelThumbnailUrl(null))

      getHyperChatsSumAmount(channelId)
        .then(setTotalAmount)
        .catch(() => setTotalAmount(null))
    }
  }, [open, session, channelId])

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
      if (step === 'complete') {
        setTimeout(async () => {
          await revalidateHyperChat(channelId)
        }, 600)
      }

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

  return {
    /** ダイアログの開閉状態 */
    open,
    /** 現在のステップ */
    step,
    /** free or paid */
    mode,
    selectedTier,
    price,
    isLoading,
    error,
    clientSecret,
    tickets,
    isLoadingTickets,
    /** メッセージ入力フォーム */
    form,
    /** フォーム > 入力中のメッセージ */
    message,
    /** フォーム > メッセージの最大文字数 */
    maxChars,
    /** Stripe Elements Options */
    elementsOptions,
    /** 投稿対象チャンネルのサムネイルURL */
    channelThumbnailUrl,
    /** 現在のチャンネルの累計金額 */
    totalAmount,
    handleProceedToPayment,
    handleTierChange,
    handlePaymentSuccess,
    handleUseTicket,
    handleSwitchToFreeMode,
    handleBack,
    handleClose
  }
}

export type UseHyperChatFlowReturn = ReturnType<typeof useHyperChatFlow>
