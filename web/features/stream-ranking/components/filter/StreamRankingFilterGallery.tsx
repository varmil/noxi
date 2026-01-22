import { PropsWithoutRef } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getGroups } from 'apis/groups'
import CountryColumn from 'components/ranking/filter/country/CountryColumn'
import DimensionColumn from 'components/ranking/filter/dimension/DimensionColumn'
import GalleryContainer from 'components/ranking/filter/gallery/GalleryContainer'
import GenderColumn from 'components/ranking/filter/gender/GenderColumn'
import GroupColumn from 'components/ranking/filter/group/GroupColumn'
import PeriodColumn from 'components/ranking/filter/period/PeriodColumn'

type Props = PropsWithoutRef<{
  className?: string
}>

export default async function StreamRankingFilterGallery({ className }: Props) {
  const groups = await getGroups()
  return (
    <GalleryContainer className={className}>
      <ScrollArea className="w-full whitespace-nowrap border border-border-variant">
        <div className="flex divide-x divide-border-variant">
          <PeriodColumn
            keys={[
              'realtime',
              'last24Hours',
              'last7Days',
              'last30Days',
              // 'last1Year',
              'thisYear'
            ]}
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
