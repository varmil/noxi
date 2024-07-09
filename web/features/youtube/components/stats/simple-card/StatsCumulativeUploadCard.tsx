import { PropsWithoutRef } from 'react'
import { Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsCumulativeVideoCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Upload}>Cumulative Uploads</StatsCardHeader>
      <StatsCardContent subText={t('cumulativeUploads')}>
        {count}
      </StatsCardContent>
    </Card>
  )
}
