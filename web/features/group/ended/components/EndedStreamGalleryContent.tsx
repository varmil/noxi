import { PropsWithoutRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import GridCardContainer, {
  GridCardGalleryContent,
  GridCardGalleryFirstView,
  GridCardGalleryMore
} from 'components/styles/GridCardContainer'
import EndedStreams from 'features/group/ended/components/EndedStreams'
import StreamListContentContainer from 'features/group/stream/components/stream-list/StreamListContentContainer'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function EndedStreamGalleryContent({
  streams,
  compact
}: Props) {
  /** compact表示のときはそもそも全部出す */
  const FIRST_VIEW_LIMIT = compact ? streams.length : 6
  const isCollapsible = streams.length > FIRST_VIEW_LIMIT
  const firstView = streams.slice(0, FIRST_VIEW_LIMIT)
  const more = streams.slice(FIRST_VIEW_LIMIT)

  return (
    <CardContent>
      <GridCardGalleryContent>
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
