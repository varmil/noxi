import { PropsWithoutRef, SVGProps } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsSubscribersCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Icon}>Subscribers</StatsCardHeader>
      <StatsCardContent subText={t('totalSubscribers')}>
        <IntlNumberFormat>{count}</IntlNumberFormat>
      </StatsCardContent>
    </Card>
  )
}

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    focusable="false"
  >
    <path d="M11.72 11.93C13.58 11.59 15 9.96 15 8c0-2.21-1.79-4-4-4S7 5.79 7 8c0 1.96 1.42 3.59 3.28 3.93C4.77 12.21 2 15.76 2 20h18c0-4.24-2.77-7.79-8.28-8.07zM8 8c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3 4.9c5.33 0 7.56 2.99 7.94 6.1H3.06c.38-3.11 2.61-6.1 7.94-6.1zm5.68-1.46-.48-.88C17.31 9.95 18 8.77 18 7.5s-.69-2.45-1.81-3.06l.49-.88C18.11 4.36 19 5.87 19 7.5c0 1.64-.89 3.14-2.32 3.94zm2.07 1.69-.5-.87c1.7-.98 2.75-2.8 2.75-4.76s-1.05-3.78-2.75-4.76l.5-.87C20.75 3.03 22 5.19 22 7.5s-1.24 4.47-3.25 5.63z"></path>
  </svg>
)
