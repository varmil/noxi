import { PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getMembershipBundle } from 'apis/youtube/getMembershipBundle'
import StatsCardSkeleton from 'components/skeleton/StatsCardSkeleton'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'

type Props = {
  videoId: string
  className?: string
}

export default function StatsMembershipCountCard({
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
  const count = membershipBundle?.count ?? 0

  return (
    <StatsCard className={className}>
      <StatsCardHeader>Membership Count</StatsCardHeader>
      <StatsCardContent subText={t('membershipCount')}>
        {count.toLocaleString()}
      </StatsCardContent>
    </StatsCard>
  )
}
