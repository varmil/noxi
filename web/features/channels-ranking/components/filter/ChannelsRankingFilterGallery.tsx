import { PropsWithoutRef } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import CountryColumn from 'components/ranking/filter/country/CountryColumn'
import DimensionColumn from 'components/ranking/filter/dimension/DimensionColumn'
import GalleryContainer from 'components/ranking/filter/gallery/GalleryContainer'
import GroupColumn from 'components/ranking/filter/group/GroupColumn'
import PeriodColumn from 'components/ranking/filter/period/PeriodColumn'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'

type Props = PropsWithoutRef<{
  dimension: ChannelsRankingDimension
  className?: string
}>

export default function ChannelsRankingFilterGallery({
  className,
  dimension
}: Props) {
  return (
    <GalleryContainer className={className}>
      <ScrollArea className="w-full whitespace-nowrap border">
        <div className="flex divide-x">
          <PeriodColumn
            keys={
              dimension === 'subscriber'
                ? ['all']
                : [
                    'last24Hours',
                    'last7Days',
                    'last30Days',
                    'last1Year',
                    'thisWeek',
                    'thisMonth',
                    'thisYear'
                  ]
            }
          />
          <DimensionColumn keys={['super-chat', 'subscriber']} />
          <GroupColumn />
          <CountryColumn />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </GalleryContainer>
  )
}
