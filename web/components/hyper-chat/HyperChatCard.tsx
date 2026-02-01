import { cn } from '@/lib/utils'
import { HyperChatSchema, TierValue } from 'apis/hyper-chats/hyperChatSchema'

/** Tier別の背景色 */
const TIER_COLORS: Record<TierValue, string> = {
  lite: 'bg-cyan-50 dark:bg-cyan-950/30',
  standard: 'bg-yellow-50 dark:bg-yellow-950/30',
  max: 'bg-red-50 dark:bg-red-950/30'
}

/** Tier別のボーダー色 */
const TIER_BORDER_COLORS: Record<TierValue, string> = {
  lite: 'border-l-cyan-400',
  standard: 'border-l-yellow-400',
  max: 'border-l-red-400'
}

/** Tier別のラベル */
const TIER_LABELS: Record<TierValue, string> = {
  lite: 'Lite',
  standard: 'Standard',
  max: 'MAX'
}

/** Tier別のラベル色 */
const TIER_LABEL_COLORS: Record<TierValue, string> = {
  lite: 'text-cyan-600 dark:text-cyan-400',
  standard: 'text-yellow-600 dark:text-yellow-400',
  max: 'text-red-600 dark:text-red-400'
}

interface Props {
  hyperChat: HyperChatSchema
  className?: string
}

export function HyperChatCard({ hyperChat, className }: Props) {
  const bgColor = TIER_COLORS[hyperChat.tier]
  const borderColor = TIER_BORDER_COLORS[hyperChat.tier]
  const label = TIER_LABELS[hyperChat.tier]
  const labelColor = TIER_LABEL_COLORS[hyperChat.tier]

  const formattedDate = new Date(hyperChat.createdAt).toLocaleDateString(
    'ja-JP',
    {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  )

  const formattedAmount = new Intl.NumberFormat('ja-JP').format(hyperChat.amount)

  return (
    <div
      className={cn(
        'rounded-lg border-l-4 p-3',
        bgColor,
        borderColor,
        className
      )}
      data-testid="hyper-chat-card"
    >
      <div className="mb-1 flex items-center justify-between">
        <span className={cn('text-xs font-medium', labelColor)}>{label}</span>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      <p className="text-sm text-foreground">{hyperChat.message}</p>
      <div className="mt-2 text-right">
        <span className="text-xs text-muted-foreground">{formattedAmount}円</span>
      </div>
    </div>
  )
}
