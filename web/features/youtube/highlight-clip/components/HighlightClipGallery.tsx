import { PropsWithoutRef } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { searchVideos } from 'api/youtube/searchVideos'
import { GroupString } from 'config/constants/Site'
import VideoCard from 'features/youtube/video/components/VideoCard'
import dayjs from 'lib/dayjs'
import { getGroup } from 'lib/server-only-context/cache'

type Props = { channelId?: string }

const qMap: Record<GroupString, Record<'ja' | 'en', string>> = {
  hololive: { ja: 'ホロライブ 切り抜き', en: 'hololive clips' },
  'hololive-english': {
    ja: 'ホロライブ english 切り抜き',
    en: 'hololive english clips'
  },
  'hololive-indonesia': {
    ja: 'ホロライブ indonesia 切り抜き',
    en: 'hololive indonesia clips'
  }
}

export async function HighlightClipGallery({}: PropsWithoutRef<Props>) {
  const groupStr = getGroup()
  const locale = await getLocale()
  const videos = await searchVideos({
    q: qMap[groupStr][locale],
    limit: 12,
    order: 'relevance',
    publishedAfter: dayjs().subtract(6, 'days').toDate(),
    language: locale
  })

  const group = (await getTranslations('Global.group'))(`${groupStr}`)
  const t = await getTranslations('Features.youtube.highlight-clip')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description', { group })}</CardDescription>
      </CardHeader>
      <CardContent
        className={`grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-4`}
      >
        {/* TODO: short, medium - long で分ける */}
        {videos
          .sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)
          .map(video => {
            const { id } = video
            return <VideoCard key={id} {...video} />
          })}
      </CardContent>
    </Card>
  )
}
