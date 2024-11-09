import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = PropsWithoutRef<{
  count: number
  className?: string
}>

export default function StatsVideosCard({ count, className }: Props) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card className={className}>
      <StatsCardHeader>Videos</StatsCardHeader>
      <StatsCardContent subText={t('totalVideos')}>{count}</StatsCardContent>
    </Card>
  )
}
