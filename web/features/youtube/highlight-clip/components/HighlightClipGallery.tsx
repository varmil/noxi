import { PropsWithoutRef } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { searchVideos } from 'apis/youtube/searchVideos'
import GridCardContainer from 'components/styles/GridCardContainer'
import Image from 'components/styles/Image'
import { HighlightClipCarousel } from 'features/youtube/highlight-clip/components/HighlightClipCarousel'
import VideoCard from 'features/youtube/video/components/VideoCard'
import dayjs from 'lib/dayjs'
import { getGroup } from 'lib/server-only-context/cache'

type Props = { channelId?: string }

/** @deprecated */
export async function HighlightClipGallery({}: PropsWithoutRef<Props>) {
  const groupStr = getGroup()
  const locale = await getLocale()
  const videos = (
    await searchVideos({
      q: '',
      limit: 50,
      order: 'relevance',
      publishedAfter: dayjs().subtract(7, 'days').startOf('day').toDate(),
      language: locale
    })
  ).sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)

  // take first 6
  const shorts = videos.filter(video => video.isShort).slice(0, 6)
  // take first 6
  const notShorts = videos.filter(video => !video.isShort).slice(0, 6)

  const group = (await getTranslations('Global.group'))(`${groupStr}`)
  const t = await getTranslations('Features.youtube.highlight-clip')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description', { group })}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-12">
        {/* short */}
        <section className="grid gap-y-4">
          <div className="flex items-center gap-1">
            <Image
              src={'/youtube/shorts-icon.svg'}
              alt={`YouTube ${t('shorts')}`}
              width={100}
              height={100}
              className="w-6 h-6"
            />
            <span className="font-bold">{t('shorts')}</span>
          </div>

          <section className="flex items-center justify-center w-full overflow-hidden">
            <HighlightClipCarousel videos={shorts} />
          </section>
        </section>

        {/*  medium - long  */}
        <GridCardContainer className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {notShorts.map(video => {
            const { id } = video
            return <VideoCard key={id} {...video} />
          })}
        </GridCardContainer>
      </CardContent>
    </Card>
  )
}
