import { PropsWithoutRef } from 'react'
import { Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsVideosCard({ count }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Upload}>Videos</StatsCardHeader>
      <StatsCardContent subText={t('totalVideos')}>{count}</StatsCardContent>
    </Card>
  )
}
