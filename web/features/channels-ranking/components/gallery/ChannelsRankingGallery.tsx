import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import SignupBanner from 'components/banners/SignupBanner'
import { PageXSPX } from 'components/page'
import { ChannelsRankingDefaultUrl } from 'config/constants/RankingRoute'
import ChannelsRankingTable from 'features/channels-ranking/components/table/ChannelsRankingTable'
import ChannelsRankingTableTitle from 'features/channels-ranking/components/table/ChannelsRankingTableTitle'
import { ChannelsRankingSearchParams } from 'features/channels-ranking/types/channels-ranking.type'
import { auth } from 'lib/auth'
import { Link } from 'lib/navigation'
import {
  getChannelsParams,
  getSupersSummariesParams
} from '../../utils/gallery-params'

export type ChannelsRankingGalleryProps = ChannelsRankingSearchParams & {
  compact?: boolean
  className?: string
}

/**
 * 役割
 * Gallery：Orderを決める（ランキングの順番を決める）
 * Table  ：各列で表示する内容を決める（各列をfetchする）
 *
 * 両者で似たようなFetchになるのは許容する
 **/
export default async function ChannelsRankingGallery(
  props: PropsWithoutRef<ChannelsRankingGalleryProps>
) {
  let channelIds: string[] = []

  const session = await auth()
  const t = await getTranslations('Features.channelsRanking')
  const { period, dimension, group, gender, date, page, compact, className } =
    props

  if (dimension === 'super-chat') {
    const supersSummaries = await getSupersSummaries(
      getSupersSummariesParams(props)
    )
    channelIds = supersSummaries.map(summary => summary.channelId)
  }

  if (dimension === 'subscriber') {
    const channels = await getChannels(getChannelsParams(props))
    channelIds = channels.map(channel => channel.basicInfo.id)
  }

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <ChannelsRankingTableTitle
        dimension={dimension}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        className={`${!compact ? PageXSPX : ''} sm:px-0`}
      />

      {!session ? (
        <div className={`${!compact ? PageXSPX : ''} sm:px-0`}>
          <SignupBanner />
        </div>
      ) : null}

      <ChannelsRankingTable
        channelIds={channelIds}
        dimension={dimension}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        page={Number(page) || 1}
      />

      {compact && (
        <Button variant={'outline'} asChild className="w-full gap-1">
          <Link href={ChannelsRankingDefaultUrl}>
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </section>
  )
}
