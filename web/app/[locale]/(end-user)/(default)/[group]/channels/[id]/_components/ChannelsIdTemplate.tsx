import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import SupersRanking from 'features/supers-ranking/components/SupersRanking'
import { Period } from 'types/period'
import ChannelData from './ui/channel-data/ChannelData'

type Props = PropsWithoutRef<{ id: string; period: Period }>

export async function ChannelsIdTemplate({ id, period }: Props) {
  const [page, channel] = await Promise.all([
    getTranslations('Page.group.channelsId.index.section'),
    getChannel(id)
  ])

  return (
    <Sections className={`lg:grid-cols-4`}>
      <Section
        className="lg:col-span-3 lg:order-2"
        title={page('ranking.title')}
      >
        <SupersRanking channelId={id} period={period} />
      </Section>

      <Section
        gridClassName={'grid-cols-2 lg:grid-cols-1'}
        className="lg:col-span-1 lg:order-1"
        title={page('data.title')}
      >
        <ChannelData channel={channel} />
      </Section>
    </Sections>
  )
}
