import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import ChannelData from './ui/channel-data/ChannelData'
import ChannelOverviewStatsCards from './ui/stats/ChannelOverviewStatsCards'
import TopLiveStreamsGallery from './ui/top-lives/TopLiveStreamsGallery'
import TopSuperChatComments from './ui/top-superchats/TopSuperChatComments'

type Props = PropsWithoutRef<{ id: string }>

export async function ChannelsIdTemplate({ id }: Props) {
  const [page, channel] = await Promise.all([
    getTranslations('Page.group.channelsId.index.section'),
    getChannel(id)
  ])

  return (
    <Sections className="lg:grid-cols-6">
      {/* チャンネル基本情報 */}
      <Section
        className="col-span-full lg:order-1"
        gridClassName="grid-cols-2 lg:grid-cols-4"
        title={page('data.title')}
      >
        <ChannelData channel={channel} />
      </Section>

      {/* 統計カード */}
      <Section
        className="lg:col-span-3 lg:order-2"
        gridClassName="grid-cols-1 md:grid-cols-3"
        title={page('stats.title')}
      >
        <ChannelOverviewStatsCards channelId={id} />
      </Section>

      {/* 人気ライブTop3 */}
      <Section
        className="lg:col-span-3 lg:order-3"
        title={page('topLives.title')}
      >
        <TopLiveStreamsGallery channelId={id} />
      </Section>

      {/* 上位スーパーチャットコメント */}
      <Section
        className="col-span-full lg:order-4"
        title={page('topSuperChats.title')}
      >
        <TopSuperChatComments channelId={id} />
      </Section>
    </Sections>
  )
}
