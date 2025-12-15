import { PropsWithoutRef } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import CountryColumn from 'components/ranking/filter/country/CountryColumn'
import DimensionColumn from 'components/ranking/filter/dimension/DimensionColumn'
import GalleryContainer from 'components/ranking/filter/gallery/GalleryContainer'
import GenderColumn from 'components/ranking/filter/gender/GenderColumn'
import GroupColumn from 'components/ranking/filter/group/GroupColumn'
import PeriodColumn from 'components/ranking/filter/period/PeriodColumn'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { getGroups } from 'hooks/useGroups'

type Props = PropsWithoutRef<{
  dimension: ChannelsRankingDimension
  className?: string
}>

export default async function ChannelsRankingFilterGallery({
  dimension,
  className
}: Props) {
  const groups = await getGroups()
  return (
    <GalleryContainer className={className}>
      <ScrollArea className="w-full whitespace-nowrap border border-border-variant">
        <div className="flex divide-x divide-border-variant">
          <PeriodColumn
            keys={
              dimension === 'subscriber'
                ? ['wholePeriod']
                : [
                    'last24Hours',
                    'last7Days',
                    'last30Days',
                    // 'last1Year',
                    // 'thisWeek',
                    // 'thisMonth',
                    'thisYear'
                  ]
            }
          />
          <DimensionColumn />
          <GroupColumn groups={groups} />
          <GenderColumn />
          <CountryColumn />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </GalleryContainer>
  )
}
