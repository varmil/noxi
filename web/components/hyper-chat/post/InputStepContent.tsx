'use client'

import { AlertCircleIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
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
  isAnonymous: boolean
  onAnonymousChange: (value: boolean) => void
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
  price,
  isAnonymous,
  onAnonymousChange
}: Props) {
  const { data: session } = useSession()
  const t = useTranslations('Features.hyperChat')
  const userName = session?.user?.name ?? ''
  const userImage = session?.user?.image
  const displayName = isAnonymous ? t('anonymous.displayName') : userName

  return (
    <div className="space-y-6 pb-6">
      <div className="flex gap-3">
        <Avatar key={String(isAnonymous)} className="size-9 shrink-0 mt-1">
          {!isAnonymous && (
            <AvatarImage src={userImage ?? undefined} alt={displayName} />
          )}
          <AvatarFallback className="text-xs">
            {displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between w-full gap-5 mb-2">
            <span className="ml-0.5 text-sm text-muted-foreground line-clamp-1 break-all">
              {isAnonymous ? t('anonymous.displayName') : userName}
            </span>

            <div className="flex shrink-0 items-center gap-2 ml-auto">
              <Switch
                id="anonymous-mode"
                checked={isAnonymous}
                onCheckedChange={onAnonymousChange}
              />
              <Label
                htmlFor="anonymous-mode"
                className="text-sm cursor-pointer"
              >
                {t('anonymous.label')}
              </Label>
            </div>
          </div>
          <Form {...form}>
            <MessageInput control={form.control} maxChars={maxChars} />
          </Form>
        </div>
      </div>

      <TierSlider
        selectedTier={selectedTier}
        onTierChange={onTierChange}
        onSelectFree={onSelectFree}
        hasTicket={!isLoadingTickets && tickets.length > 0}
        ticketCount={tickets.length}
        isTicketMode={mode === 'free'}
      />

      <PostTarget
        channelTitle={channelTitle}
        channelThumbnailUrl={channelThumbnailUrl}
        totalAmount={totalAmount}
        price={price}
        mode={mode}
      />

      {error && (
        <Alert variant="destructive" className="max-w-md">
          <AlertCircleIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
    </div>
  )
}
