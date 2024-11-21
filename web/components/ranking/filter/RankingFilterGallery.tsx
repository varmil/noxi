'use client'

import { PropsWithoutRef, useState } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import GroupColumn from 'components/ranking/filter/group/GroupColumn'
import PeriodColumn from 'components/ranking/filter/period/PeriodColumn'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function RankingFilterGallery({ className }: Props) {
  const [dimension, setDimension] = useState('concurrent-viewer')
  const [country, setCountry] = useState('worldwide')

  return (
    <div className={`text-xs sm:text-sm bg-background ${className || ''}`}>
      <ScrollArea className="w-full whitespace-nowrap border">
        <div className="flex divide-x">
          {/* 期間 */}
          <PeriodColumn />

          {/* ディメンション */}
          <Column>
            <ColumnHeader>ディメンション</ColumnHeader>
            <ColumnContent>
              <SelectButton
                variant={
                  dimension === 'concurrent-viewer' ? 'default' : 'ghost'
                }
                onClick={() => setDimension('concurrent-viewer')}
              >
                同時視聴者数
              </SelectButton>
              <SelectButton
                variant={'ghost'}
                disabled
                // variant={
                //   dimension === 'most-super-chatted' ? 'default' : 'ghost'
                // }
                // onClick={() => setDimension('most-super-chatted')}
              >
                スーパーチャット額（実装中）
              </SelectButton>
            </ColumnContent>
          </Column>

          <GroupColumn />

          {/* 国 */}
          <Column>
            <ColumnHeader>国</ColumnHeader>
            <ColumnContent>
              <SelectButton
                variant={country === 'worldwide' ? 'secondary' : 'ghost'}
                onClick={() => setCountry('worldwide')}
              >
                🌐 全世界
              </SelectButton>
              <SelectButton
                variant={country === 'japan' ? 'secondary' : 'ghost'}
                onClick={() => setCountry('japan')}
              >
                🇯🇵 日本
              </SelectButton>
              <SelectButton
                variant={country === 'korea' ? 'secondary' : 'ghost'}
                onClick={() => setCountry('korea')}
              >
                🇰🇷 韓国
              </SelectButton>
              <SelectButton
                variant={country === 'taiwan' ? 'secondary' : 'ghost'}
                onClick={() => setCountry('taiwan')}
              >
                🇹🇼 台湾
              </SelectButton>
              <SelectButton
                variant={country === 'us' ? 'secondary' : 'ghost'}
                onClick={() => setCountry('us')}
              >
                🇺🇸 アメリカ
              </SelectButton>
            </ColumnContent>
          </Column>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
