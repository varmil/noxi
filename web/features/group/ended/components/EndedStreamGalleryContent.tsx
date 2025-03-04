import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { CardContent } from '@/components/ui/card'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  GridCardGalleryContent,
  GridCardGalleryFirstView
} from 'components/styles/GridCardContainer'
import EndedStreams from 'features/group/ended/components/EndedStreams'

type Props = PropsWithoutRef<{ streams: StreamsSchema }>

export default async function EndedStreamGalleryContent({ streams }: Props) {
  const [t] = await Promise.all([getTranslations('Features.stream')])

  return (
    <CardContent>
      <GridCardGalleryContent>
        {streams.length === 0 && (
          <p className="text-muted-foreground">{t('noEnded')}</p>
        )}
        <GridCardGalleryFirstView>
          <EndedStreams streams={streams} />
        </GridCardGalleryFirstView>
      </GridCardGalleryContent>
    </CardContent>
  )
}
