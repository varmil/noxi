import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { PageXSPX } from 'components/page'
import ChannelsRankingTable from 'features/channels-ranking/components/table/ChannelsRankingTable'
import ChannelsRankingTableTitle from 'features/channels-ranking/components/table/ChannelsRankingTableTitle'
import {
  ChannelsRankingPeriod,
  ChannelsRankingDimension,
  ChannelsRankingGroup,
  ChannelsRankingCountry
} from 'features/channels-ranking/types/channels-ranking.type'
import { Link } from 'lib/navigation'
import createGetSupersBundlesParams from '../../utils/createGetSupersBundlesParams'
import createGetSupersSummariesParams from '../../utils/createGetSupersSummariesParams'

export type ChannelsRankingGalleryProps = {
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group?: ChannelsRankingGroup
  country?: ChannelsRankingCountry
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
  const t = await getTranslations('Features.channelsRanking')
  const { period, dimension, compact, className } = props

  if (dimension === 'super-chat') {
    // TODO: fetch from Supers Bundles (ondemand SUM)
    if (period === 'last24Hours') {
      const bundles = await getSupersBundles(
        createGetSupersBundlesParams(props)
      )
      channelIds = bundles.map(bundle => bundle.channelId)
    }
    // TODO: fetch from Supers Summaries
    else {
      const supersSummaries = await getSupersSummaries(
        createGetSupersSummariesParams(props)
      )
      channelIds = supersSummaries.map(summary => summary.channelId)
    }
  }

  /**
   * TODO: impl Dimensionがsubscriberの場合、Periodは「全期間」のみ表示したい
   */
  if (dimension === 'subscriber') {
    const channels = await getChannels({
      orderBy: [{ field: 'subscriberCount', order: 'desc' }],
      limit: 30
    })
    channelIds = channels.map(channel => channel.basicInfo.id)
  }

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <ChannelsRankingTableTitle
        period={period}
        dimension={dimension}
        className={`${!compact ? PageXSPX : ''} sm:px-0`}
      />

      <ChannelsRankingTable
        period={period}
        dimension={dimension}
        channelIds={channelIds}
      />

      {compact && (
        <Button variant={'outline'} asChild className="w-full gap-1">
          <Link href="/youtube/live/ranking">
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </section>
  )
}
