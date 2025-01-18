import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { CardContent } from '@/components/ui/card'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  GridCardGalleryContent,
  GridCardGalleryFirstView,
  GridCardGalleryMore
} from 'components/styles/GridCardContainer'
import EndedStreams from 'features/group/ended/components/EndedStreams'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function EndedStreamGalleryContent({
  streams,
  compact
}: Props) {
  const [t] = await Promise.all([getTranslations('Features.stream')])

  /** compact表示のときはFooterにリンクが出るので、ここでの「もっと見る」は出さない */
  const FIRST_VIEW_LIMIT = 28
  const isCollapsible = !compact && streams.length > FIRST_VIEW_LIMIT
  const firstView = streams.slice(0, FIRST_VIEW_LIMIT)
  const more = streams.slice(FIRST_VIEW_LIMIT)

  return (
    <CardContent>
      <GridCardGalleryContent>
        {streams.length === 0 && (
          <p className="text-muted-foreground">{t('noEnded')}</p>
        )}

        <GridCardGalleryFirstView>
          <EndedStreams streams={firstView} compact={compact} />
        </GridCardGalleryFirstView>

        {isCollapsible && (
          <GridCardGalleryMore>
            <EndedStreams streams={more} />
          </GridCardGalleryMore>
        )}
      </GridCardGalleryContent>
    </CardContent>
  )
}
