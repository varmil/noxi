import { PropsWithoutRef } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import DimensionColumn from 'components/ranking/filter/dimension/DimensionColumn'
import GalleryContainer from 'components/ranking/filter/gallery/GalleryContainer'
import GenderColumn from 'components/ranking/filter/gender/GenderColumn'
import GroupColumn from 'components/ranking/filter/group/GroupColumn'
import PeriodColumn from 'components/ranking/filter/period/PeriodColumn'
import SeasonColumn from 'components/ranking/filter/season/SeasonColumn'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function TopFansFilterGallery({ className }: Props) {
  return (
    <GalleryContainer className={className}>
      <ScrollArea className="w-full whitespace-nowrap border border-border-variant">
        <div className="flex divide-x divide-border-variant">
          <PeriodColumn keys={['last7Days', 'last30Days', 'all']} />
          <DimensionColumn />
          <GroupColumn pathname="/ranking/top-fans" />
          <GenderColumn />
          <SeasonColumn />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </GalleryContainer>
  )
}
