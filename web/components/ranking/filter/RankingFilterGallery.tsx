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

type Props = PropsWithoutRef<{
  className?: string
}>

export default function RankingFilterGallery({ className }: Props) {
  const [dimension, setDimension] = useState('most-super-chatted')
  const [country, setCountry] = useState('worldwide')
  const [period, setPeriod] = useState('daily')

  return (
    <div
      className={`w-full text-xs sm:text-sm bg-background ${className || ''}`}
    >
      <ScrollArea className="w-full whitespace-nowrap border">
        <div className="flex divide-x">
          {/* 期間 */}
          <Column>
            <ColumnHeader>期間</ColumnHeader>
            <ColumnContent>
              <SelectButton
                variant={period === 'daily' ? 'default' : 'ghost'}
                onClick={() => setPeriod('daily')}
              >
                デイリー
              </SelectButton>
              <SelectButton
                variant={period === 'weekly' ? 'default' : 'ghost'}
                onClick={() => setPeriod('weekly')}
              >
                ウィークリー
              </SelectButton>
              <SelectButton
                variant={period === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setPeriod('monthly')}
              >
                マンスリー
              </SelectButton>
              <SelectButton
                variant={period === 'yearly' ? 'default' : 'ghost'}
                onClick={() => setPeriod('yearly')}
              >
                年間
              </SelectButton>
            </ColumnContent>
          </Column>

          {/* ディメンション */}
          <Column>
            <ColumnHeader>ディメンション</ColumnHeader>
            <ColumnContent>
              <SelectButton
                variant={
                  dimension === 'most-super-chatted' ? 'default' : 'ghost'
                }
                onClick={() => setDimension('most-super-chatted')}
              >
                スーパーチャット額
              </SelectButton>
              <SelectButton
                variant={
                  dimension === 'most-watched-live' ? 'default' : 'ghost'
                }
                onClick={() => setDimension('most-watched-live')}
              >
                同時視聴者数
              </SelectButton>
            </ColumnContent>
          </Column>

          <GroupColumn />

          {/* 国 */}
          <Column>
            <ColumnHeader>国</ColumnHeader>
            <ColumnContent>
              <SelectButton
                variant={country === 'worldwide' ? 'default' : 'ghost'}
                onClick={() => setCountry('worldwide')}
              >
                🌐 全世界
              </SelectButton>
              <SelectButton
                variant={country === 'japan' ? 'default' : 'ghost'}
                onClick={() => setCountry('japan')}
              >
                🇯🇵 日本
              </SelectButton>
              <SelectButton
                variant={country === 'korea' ? 'default' : 'ghost'}
                onClick={() => setCountry('korea')}
              >
                🇰🇷 韓国
              </SelectButton>
              <SelectButton
                variant={country === 'taiwan' ? 'default' : 'ghost'}
                onClick={() => setCountry('taiwan')}
              >
                🇹🇼 台湾
              </SelectButton>
              <SelectButton
                variant={country === 'us' ? 'default' : 'ghost'}
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
