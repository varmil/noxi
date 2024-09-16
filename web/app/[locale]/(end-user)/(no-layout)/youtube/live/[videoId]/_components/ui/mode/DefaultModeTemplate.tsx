import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import OpenChatButton from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/button/OpenChatButton'
import { Page } from 'components/page'
import {
  LeftContainer,
  RightContainer
} from '../../layouts/default/LgContainer'
import PadSection from '../../layouts/default/PadSection'
import MaximizeButton from '../button/MaximizeButton'
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
  const colClass = ''

  return (
    <div className="grid grid-cols-1 lg:flex lg:gap-x-0">
      {/* sm:space-y-4 === DefaultLayoutのsm:gap-4 */}
      <LeftContainer className={'sm:space-y-4'}>
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
          <section className="order-1 aspect-video w-full bg-black lg:col-span-full">
            <EmbedStream videoId={videoId} className="w-full h-full" />
          </section>

          {/* タイトル、投稿者情報 */}
          <PadSection
            left
            className="order-3 space-y-4 @xs:col-span-full @4xl:col-span-3"
          >
            <MaximizeButton />
            <StreamBasicInfo stream={stream} />
          </PadSection>

          {/* Open ChatList & Related Videos */}
          <PadSection
            right
            className="order-4 space-y-4 @xs:col-span-full @4xl:col-span-2"
          >
            <OpenChatButton />
            <RelatedVideos />
          </PadSection>
        </Page>
      </LeftContainer>

      <RightContainer>
        {/* Chat */}
        <PadSection className="lg:px-0 order-2">
          <section className="relative min-h-80 h-[calc(100vh-26rem)] lg:h-[calc(100vh-9.5rem)] lg:fixed lg:w-[350px]">
            <EmbedLiveChat videoId={videoId} showCloseButton />
          </section>
        </PadSection>
      </RightContainer>
    </div>
  )
}
