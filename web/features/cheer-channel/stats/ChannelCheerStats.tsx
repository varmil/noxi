import { TrendingUp, Tickets, Trophy, Flame } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getCheeredRank } from 'apis/cheer-ticket-usages/getCheeredRank'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader
} from 'components/styles/card/StatsCard'
import dayjs from 'lib/dayjs'

export async function ChannelCheerStats({
  channel
}: {
  channel: ChannelSchema
}) {
  const [feat, rankForLast7Days, rankForSeason] = await Promise.all([
    getTranslations('Features.cheerChannel.stats'),
    getCheeredRank({
      channelId: channel.basicInfo.id,
      usedAt: { gte: dayjs().subtract(7, 'days').toDate() }
    }),
    getCheeredRank({
      channelId: channel.basicInfo.id,
      usedAt: { gte: dayjs().subtract(365, 'days').toDate() } // 便宜的に１年にしておく
    })
  ])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-1">
        <StatsCard>
          <StatsCardHeader>{feat('past7Days')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <Flame className="mr-2 size-5 text-violet-700 dark:text-violet-500" />
              <span className="text-2xl font-bold">
                {rankForLast7Days?.usedCount.toLocaleString() ?? 0}
              </span>
            </div>
          </StatsCardContent>
        </StatsCard>

        <StatsCard>
          <StatsCardHeader>{feat('cheerRank')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <TrendingUp className="mr-2 size-5 text-blue-700 dark:text-blue-500" />
              <span className="text-2xl font-bold">
                {rankForLast7Days ? <>{rankForLast7Days.rank}位</> : '--'}
              </span>
            </div>
          </StatsCardContent>
        </StatsCard>

        <StatsCard>
          <StatsCardHeader>{feat('seasonTotal')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <Tickets className="mr-2 size-5 text-pink-700 dark:text-pink-500" />
              <span className="text-2xl font-bold">
                {rankForSeason?.usedCount.toLocaleString() ?? 0}
              </span>
            </div>
          </StatsCardContent>
        </StatsCard>

        <StatsCard>
          <StatsCardHeader>{feat('seasonRank')}</StatsCardHeader>
          <StatsCardContent>
            <div className="flex items-baseline">
              <Trophy className="mr-2 size-5 text-emerald-700 dark:text-emerald-500" />
              <span className="text-2xl font-bold">
                {rankForSeason ? <>{rankForSeason.rank}位</> : '--'}
              </span>
            </div>
          </StatsCardContent>
        </StatsCard>
      </div>
    </div>
  )
}
