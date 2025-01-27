import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'

type Props = { id: string }

export async function ChannelsIdLiveTemplate({ id }: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.group.channelsId.live')

  return (
    <Sections>
      <Section title={t('section.title')}>
        <EndedStreamGallery where={{ channelId: id }} />
      </Section>
    </Sections>
  )
}
