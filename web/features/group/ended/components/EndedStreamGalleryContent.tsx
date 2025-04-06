import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  GridCardGalleryContainer,
  GridCardGalleryContent
} from 'components/styles/GridCardContainer'
import EndedStreams from 'features/group/ended/components/EndedStreams'

type Props = PropsWithoutRef<{ streams: StreamsSchema; compact?: boolean }>

export default async function EndedStreamGalleryContent({
  streams,
  compact
}: Props) {
  const [t] = await Promise.all([getTranslations('Features.stream')])

  return (
    <GridCardGalleryContainer>
      {streams.length === 0 && (
        <p className="text-muted-foreground">{t('noEnded')}</p>
      )}
      <GridCardGalleryContent force1Row={compact}>
        <EndedStreams streams={streams} />
      </GridCardGalleryContent>
    </GridCardGalleryContainer>
  )
}
