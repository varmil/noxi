import { PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'

type Props = { id: string }

export async function ChannelsIdLiveTemplate({ id }: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.group.channelsId.live')

  return (
    <Sections>
      <Section title={t('section.title')}>
        <Suspense fallback={<p>Loading Live Streams...</p>}>
          <EndedStreamGallery where={{ channelId: id }} />
        </Suspense>
      </Section>
    </Sections>
  )
}
