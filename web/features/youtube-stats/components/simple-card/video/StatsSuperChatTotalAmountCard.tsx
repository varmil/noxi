import { PropsWithoutRef, Suspense } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getSupersBundle } from 'apis/supers/getSupersBundle'
import StatsCardSkeleton from 'components/skeleton/StatsCardSkeleton'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

type Props = {
  videoId: string
  className?: string
}

export default function StatsSuperChatTotalAmountCard({
  videoId,
  className
}: PropsWithoutRef<Props>) {
  return (
    <Suspense fallback={<StatsCardSkeleton />}>
      <Contents videoId={videoId} className={className} />
    </Suspense>
  )
}

async function Contents({ videoId, className }: PropsWithoutRef<Props>) {
  const [t, supersBundle] = await Promise.all([
    getTranslations('Features.youtube.stats.card'),
    getSupersBundle(videoId)
  ])
  const total = formatMicrosAsRoundedAmount(
    supersBundle?.amountMicros ?? BigInt(0)
  )
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Super Chat</StatsCardHeader>
      <StatsCardContent subText={t('totalSuperChats')}>
        <div className="flex items-center space-x-0.5">
          <JapaneseYen className="h-4 w-4" />
          <span>{total}</span>
        </div>
      </StatsCardContent>
    </StatsCard>
  )
}
