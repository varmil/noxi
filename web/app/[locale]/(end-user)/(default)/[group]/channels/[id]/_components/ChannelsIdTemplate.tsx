import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ChannelData from './ui/channel-data/ChannelData'

type Props = { id: string }

export async function ChannelsIdTemplate({ id }: PropsWithoutRef<Props>) {
  const [t, channel] = await Promise.all([
    getTranslations('Page.group.channelsId.template'),
    getChannel(id)
  ])

  return (
    <Sections className={`lg:grid-cols-3`}>
      <Section
        gridClassName={'grid-cols-2 lg:grid-cols-1'}
        className="lg:col-span-1 lg:order-2"
        title={t('data')}
      >
        <ChannelData channel={channel} />
      </Section>
    </Sections>
  )
}
