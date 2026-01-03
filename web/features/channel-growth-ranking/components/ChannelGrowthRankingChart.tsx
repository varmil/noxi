'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ChannelGrowthRankingsSchema } from 'apis/youtube/schema/channelGrowthRankingSchema'
import Image from 'components/styles/Image'
import { ChartCard, ChartCardHeader } from 'components/styles/card/ChartCard'

interface Props {
  data: ChannelGrowthRankingsSchema
}

export function ChannelGrowthRankingChart({ data }: Props) {
  const t = useTranslations('Features.channelGrowthRanking')
  const format = useFormatter()

  return (
    <ChartCard>
      <ChartCardHeader>
        <CardTitle className="font-semibold">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </ChartCardHeader>
      <CardContent className="px-0">
        <ScrollArea className="w-full">
          <div className="flex gap-x-2 pb-4">
            {/* 左端のラベル列 */}
            <div className="shrink-0 pl-4 pr-2 flex flex-col">
              {/* 順位の高さ分のスペース */}
              <div className="text-xs mb-1 invisible">0.</div>
              {/* アバターの高さ分のスペース */}
              <div className="h-[92px]" />
              {/* ラベル */}
              <div className="mt-2 flex flex-col gap-y-0.5 text-xs text-muted-foreground">
                <span className="leading-6 flex items-center">ch.</span>
                <span className="leading-6 flex items-center">gr.</span>
                <span className="leading-6 flex items-center">diff</span>
                <span className="leading-6 flex items-center">%</span>
                <span className="leading-6 flex items-center">sub.</span>
              </div>
            </div>

            {/* カード群 */}
            {data.map(item => (
              <a
                key={item.channelId}
                href={`/youtube/channels/${item.channelId}`}
                className="shrink-0 w-[100px] hover:opacity-80 transition-opacity"
              >
                <div className="relative flex flex-col">
                  {/* 順位 */}
                  <div className="text-xs text-muted-foreground mb-1">
                    {item.rank}.
                  </div>

                  {/* アバター */}
                  <div className="size-[92px] aspect-square rounded-md bg-muted">
                    <Image
                      src={item.thumbnailUrl ?? '/placeholder-user.jpg'}
                      alt={item.channelTitle}
                      width={92}
                      height={92}
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* データ表示（ラベルなし） */}
                  <div className="mt-2 flex flex-col gap-y-0.5 text-xs">
                    <span
                      className="leading-6 truncate"
                      title={item.channelTitle}
                    >
                      {item.channelTitle}
                    </span>
                    <span className="leading-6 truncate text-muted-foreground">
                      {item.groupName}
                    </span>
                    <span className="leading-6 font-medium">
                      {item.diff.toLocaleString()}
                    </span>
                    <span className="leading-6 text-muted-foreground">
                      {format.number(item.rate, { maximumFractionDigits: 2 })}%
                    </span>
                    <span className="leading-6 text-muted-foreground">
                      {item.subscriberCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </a>
            ))}
            <div className="shrink-0 w-4" aria-hidden="true" />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* SEO・アクセシビリティ用テーブル */}
        <table className="sr-only">
          <caption>{t('title')}</caption>
          <thead>
            <tr>
              <th scope="col">{t('table.rank')}</th>
              <th scope="col">{t('table.channel')}</th>
              <th scope="col">{t('table.group')}</th>
              <th scope="col">{t('diff')}</th>
              <th scope="col">{t('rate')}</th>
              <th scope="col">{t('subscriberCount')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.channelId}>
                <td>{item.rank}</td>
                <td>{item.channelTitle}</td>
                <td>{item.groupName}</td>
                <td>+{item.diff}</td>
                <td>+{item.rate}%</td>
                <td>{item.subscriberCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </ChartCard>
  )
}
