import { PropsWithoutRef, Suspense } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getMembershipBundle } from 'apis/youtube/getMembershipBundle'
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

export default function StatsMembershipAmountCard({
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
  const t = await getTranslations('Features.youtube.stats.card')
  const membershipBundle = await getMembershipBundle(videoId)
  const total = formatMicrosAsRoundedAmount(
    membershipBundle?.amountMicros ?? BigInt(0)
  )

  return (
    <StatsCard className={className}>
      <StatsCardHeader>Membership</StatsCardHeader>
      <StatsCardContent subText={t('membershipAmount')}>
        <div className="flex items-center space-x-0.5">
          <JapaneseYen className="h-4 w-4" />
          <span>{total}</span>
        </div>
      </StatsCardContent>
    </StatsCard>
  )
}
