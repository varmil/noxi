import { PropsWithoutRef } from 'react'
import { Info } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import dayjs from 'lib/dayjs'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  date: string
}

export default function StatsJoinedCard({ date }: PropsWithoutRef<Props>) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Info}>Joined</StatsCardHeader>
      <StatsCardContent subText={t('joinedDescription')}>
        {format.dateTime(new Date(date), {
          dateStyle: 'medium'
        })}
      </StatsCardContent>
    </Card>
  )
}
