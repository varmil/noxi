import {
  TrendingUp,
  Tickets,
  ChartColumnIncreasing,
  HeartPlus
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader
} from 'components/styles/card/StatsCard'

export function ChannelCheerStats() {
  const t = useTranslations('Features.cheerChannel.stats')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('title')}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard>
          <StatsCardHeader>{t('past30Days')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <Tickets className="mr-2 size-5 text-pink-700 dark:text-pink-500" />
              <span className="text-2xl font-bold">1,245</span>
            </div>
          </StatsCardContent>
        </StatsCard>

        <StatsCard>
          <StatsCardHeader>{t('seasonTotal')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <ChartColumnIncreasing className="mr-2 size-5 text-violet-700 dark:text-violet-500" />
              <span className="text-2xl font-bold">5,678</span>
            </div>
          </StatsCardContent>
        </StatsCard>

        <StatsCard>
          <StatsCardHeader>{t('cheerRanking')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <TrendingUp className="mr-2 size-5 text-emerald-700 dark:text-emerald-500" />
              <span className="text-2xl font-bold">3位</span>
            </div>
          </StatsCardContent>
        </StatsCard>

        <StatsCard>
          <StatsCardHeader>{t('userCount')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <HeartPlus className="mr-2 size-5 text-amber-700 dark:text-amber-500" />
              <span className="text-2xl font-bold">842</span>
            </div>
          </StatsCardContent>
        </StatsCard>
      </div>
    </div>
  )
}
