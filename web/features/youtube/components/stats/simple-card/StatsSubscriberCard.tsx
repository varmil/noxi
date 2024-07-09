import { PropsWithoutRef } from 'react'
import { Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsSubscriberCard({ count }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Users}>Subscribers</StatsCardHeader>
      <StatsCardContent subText={t('totalSubscriberCount')}>
        {count}
      </StatsCardContent>
    </Card>
  )
}
