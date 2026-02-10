'use client'

import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { TicketSchema } from 'apis/hyper-chat-tickets/ticketSchema'
import { PaidTierValue } from 'apis/hyper-chats/hyperChatSchema'
import { Mode } from 'hooks/hyper-chat/useHyperChatFlow'
import { HyperChatFormValues } from 'hooks/hyper-chat/useHyperChatForm'
import { MessageInput } from './MessageInput'
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
  error
}: Props) {
  return (
    <div className="space-y-10 pb-6">
      <Form {...form}>
        <MessageInput control={form.control} maxChars={maxChars} />
      </Form>

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
