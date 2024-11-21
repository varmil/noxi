'use client'

import { PropsWithChildren, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function RankingFilterGallery() {
  const [category, setCategory] = useState('all')
  const [dimension, setDimension] = useState('most-super-chatted')
  const [country, setCountry] = useState('worldwide')
  const [period, setPeriod] = useState('daily')

  return (
    <div className="w-full text-sm bg-background">
      <ScrollArea className="w-full whitespace-nowrap border">
        <div className="flex divide-x">
          {/* カテゴリー */}
          <Column>
            <ColumnHeader>カテゴリー</ColumnHeader>
            <ColumnContent>
              <Button
                variant={category === 'all' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCategory('all')}
              >
                すべて
              </Button>
              <Button
                variant={category === 'pets' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCategory('pets')}
              >
                ペット・動物
              </Button>
              <Button
                variant={category === 'music' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCategory('music')}
              >
                音楽
              </Button>
              <Button
                variant={category === 'gaming' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCategory('gaming')}
              >
                ゲーム
              </Button>
              <Button
                variant={category === 'news' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCategory('news')}
              >
                ニュース・政治
              </Button>
            </ColumnContent>
          </Column>

          {/* ディメンション */}
          <Column>
            <ColumnHeader>ディメンション</ColumnHeader>
            <ColumnContent>
              <Button
                variant={
                  dimension === 'most-super-chatted' ? 'default' : 'ghost'
                }
                className="w-full justify-start py-2"
                onClick={() => setDimension('most-super-chatted')}
              >
                スーパーチャット数
              </Button>
              <Button
                variant={
                  dimension === 'most-watched-live' ? 'default' : 'ghost'
                }
                className="w-full justify-start py-2"
                onClick={() => setDimension('most-watched-live')}
              >
                ライブ視聴数
              </Button>
            </ColumnContent>
          </Column>

          {/* 国 */}
          <Column>
            <ColumnHeader>国</ColumnHeader>
            <ColumnContent>
              <Button
                variant={country === 'worldwide' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCountry('worldwide')}
              >
                🌐 全世界
              </Button>
              <Button
                variant={country === 'japan' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCountry('japan')}
              >
                🇯🇵 日本
              </Button>
              <Button
                variant={country === 'korea' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCountry('korea')}
              >
                🇰🇷 韓国
              </Button>
              <Button
                variant={country === 'taiwan' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCountry('taiwan')}
              >
                🇹🇼 台湾
              </Button>
              <Button
                variant={country === 'us' ? 'default' : 'ghost'}
                className="w-full justify-start py-2"
                onClick={() => setCountry('us')}
              >
                🇺🇸 アメリカ
              </Button>
            </ColumnContent>
          </Column>

          {/* 期間 */}
          <Column>
            <div className="flex flex-col space-y-4">
              <div>
                <ColumnHeader>期間</ColumnHeader>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="期間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">デイリー</SelectItem>
                    <SelectItem value="weekly">ウィークリー</SelectItem>
                    <SelectItem value="monthly">マンスリー</SelectItem>
                    <SelectItem value="year-end">年末</SelectItem>
                    <SelectItem value="yearly">年間</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <ColumnHeader>日付</ColumnHeader>
                <Select defaultValue="2024-11-18">
                  <SelectTrigger>
                    <SelectValue placeholder="日付を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-11-18">2024/11/18(月)</SelectItem>
                    <SelectItem value="2024-11-17">2024/11/17(日)</SelectItem>
                    <SelectItem value="2024-11-16">2024/11/16(土)</SelectItem>
                    <SelectItem value="2024-11-15">2024/11/15(金)</SelectItem>
                    <SelectItem value="2024-11-14">2024/11/14(木)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Column>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

const Column = ({ children }: PropsWithChildren) => (
  <div className="flex-1 p-4 min-w-[150px]">{children}</div>
)

const ColumnHeader = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-medium">{children}</h3>
    <Search className="h-4 w-4 text-muted-foreground" />
  </div>
)

const ColumnContent = ({ children }: PropsWithChildren) => (
  <ScrollArea className="h-[160px] sm:h-[175px]">
    <div className="flex flex-col gap-y-0.5 ">{children}</div>
  </ScrollArea>
)
