import { PropsWithoutRef } from 'react'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import {
  MainContainer,
  LgChatContainer,
  XSChatContainer
} from '../../layouts/default/Default'
import PadSection from '../../layouts/default/PadSection'
import MaximizeButton from '../button/MaximizeButton'
import OpenChatButton from '../button/OpenChatButton'
import EmbedLiveChat from '../stream/EmbedLiveChat'
import EmbedStream from '../stream/EmbedStream'
import RelatedVideos from '../stream/RelatedVideos'
import StreamBasicInfo from '../stream/StreamBasicInfo'

type Props = {
  videoId: string
}

export default async function DefaultModeTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const tg = await getTranslations('Global')
  const t = await getTranslations('Breadcrumb')
  const stream = await getStream(videoId)
  const {
    snippet: { channelId, title },
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    },
    group
  } = stream
  const { basicInfo } = await getChannel(channelId)

  return (
    <div className="grid grid-cols-1 lg:flex lg:gap-x-0">
      <MainContainer>
        <Page
          className="space-y-4 lg:grid lg:grid-cols-5"
          breadcrumb={[
            {
              href: `/${group}`,
              name: t('group', { group: tg(`group.${group}`) })
            },
            {
              href: `/${group}/channels/${basicInfo.id}`,
              name: basicInfo.title
            },
            { href: '#', name: title }
          ]}
          noPadding
        >
          {/* Stream */}
          <section className="aspect-video w-full bg-black lg:col-span-full">
            <EmbedStream videoId={videoId} className="w-full h-full" />
          </section>

          {/* XS: Chat mt-0 */}
          <XSChatContainer>
            <EmbedLiveChat videoId={videoId} showCloseButton />
          </XSChatContainer>

          {/* タイトル、投稿者情報 */}
          <PadSection
            left
            className="space-y-4 @xs:col-span-full @4xl:col-span-3"
          >
            <MaximizeButton />
            <StreamBasicInfo stream={stream} />
          </PadSection>

          {/* Open Chat Button & Related Videos */}
          <PadSection
            right
            className="space-y-4 @xs:col-span-full @4xl:col-span-2"
          >
            <OpenChatButton />
            <RelatedVideos />
          </PadSection>
        </Page>
      </MainContainer>

      {/* Large: Chat */}
      <LgChatContainer>
        <EmbedLiveChat videoId={videoId} showCloseButton />
      </LgChatContainer>
    </div>
  )
}
