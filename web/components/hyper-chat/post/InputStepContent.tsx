'use client'

import { useSession } from 'next-auth/react'
import { UseFormReturn } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form } from '@/components/ui/form'
import { TicketSchema } from 'apis/hyper-chat-tickets/ticketSchema'
import { PaidTierValue } from 'apis/hyper-chats/hyperChatSchema'
import { Mode } from 'hooks/hyper-chat/useHyperChatFlow'
import { HyperChatFormValues } from 'hooks/hyper-chat/useHyperChatForm'
import { MessageInput } from './MessageInput'
import { PostTarget } from './PostTarget'
import { TierSlider } from './TierSlider'

type Props = {
  form: UseFormReturn<HyperChatFormValues>
  maxChars: number
  selectedTier: PaidTierValue
  onTierChange: (tier: PaidTierValue) => void
  onSelectFree: () => void
  isLoadingTickets: boolean
  tickets: TicketSchema[]
  mode: Mode
  error: string | null
  channelTitle: string
  channelThumbnailUrl: string | null
  totalAmount: number | null
  price: number
}

export function InputStepContent({
  form,
  maxChars,
  selectedTier,
  onTierChange,
  onSelectFree,
  isLoadingTickets,
  tickets,
  mode,
  error,
  channelTitle,
  channelThumbnailUrl,
  totalAmount,
  price
}: Props) {
  const { data: session } = useSession()
  const userName = session?.user?.name ?? ''
  const userImage = session?.user?.image

  return (
    <div className="space-y-6 pb-6">
      <div className="flex gap-3">
        <Avatar className="size-9 shrink-0 mt-1">
          <AvatarImage src={userImage ?? undefined} alt={userName} />
          <AvatarFallback className="text-xs">
            {userName.charAt(0).toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <Form {...form}>
            <MessageInput control={form.control} maxChars={maxChars} />
          </Form>
        </div>
      </div>

      <PostTarget
        channelTitle={channelTitle}
        channelThumbnailUrl={channelThumbnailUrl}
        totalAmount={totalAmount}
        price={price}
        mode={mode}
      />

      <TierSlider
        selectedTier={selectedTier}
        onTierChange={onTierChange}
        onSelectFree={onSelectFree}
        hasTicket={!isLoadingTickets && tickets.length > 0}
        ticketCount={tickets.length}
        isTicketMode={mode === 'free'}
      />

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  )
}
