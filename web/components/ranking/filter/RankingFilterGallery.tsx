import { PropsWithoutRef } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import CountryColumn from 'components/ranking/filter/country/CountryColumn'
import DimensionColumn from 'components/ranking/filter/dimension/DimensionColumn'
import GroupColumn from 'components/ranking/filter/group/GroupColumn'
import PeriodColumn from 'components/ranking/filter/period/PeriodColumn'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function RankingFilterGallery({ className }: Props) {
  return (
    <div className={`text-xs sm:text-sm bg-background ${className || ''}`}>
      <ScrollArea className="w-full whitespace-nowrap border">
        <div className="flex divide-x">
          <PeriodColumn />
          <DimensionColumn />
          <GroupColumn />
          <CountryColumn />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
