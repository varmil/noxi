import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'

type Props = PropsWithoutRef<{
  count: number
  className?: string
}>

export default function StatsVideosCard({ count, className }: Props) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Videos</StatsCardHeader>
      <StatsCardContent subText={t('totalVideos')}>{count}</StatsCardContent>
    </StatsCard>
  )
}
