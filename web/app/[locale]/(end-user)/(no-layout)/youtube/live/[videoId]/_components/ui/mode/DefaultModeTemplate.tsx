import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getChatCounts } from 'apis/youtube/getChatCounts'
import { getStream } from 'apis/youtube/getStream'
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
import ChatCounts from '../stream/stats/ChatCounts'

type Props = {
  videoId: string
}

export default async function DefaultModeTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  const {
    snippet: { channelId, title, thumbnails },
    metrics: {},
    group
  } = stream

  const [tg, t, { basicInfo }, chatCounts] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Breadcrumb'),
    getChannel(channelId),
    getChatCounts({ videoId })
  ])

  return (
    <div className="grid grid-cols-1 lg:flex lg:gap-x-0">
      <MainContainer>
        <Page
          className="space-y-4"
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
          fullWidth
        >
          {/* full width: Stream */}
          <section className="w-full max-h-[calc(87vh-7rem)] bg-black">
            <EmbedStream
              videoId={videoId}
              img={thumbnails.maxres?.url}
              style="max-height: calc(87vh - 7rem);"
            />
          </section>

          {/* XS only: Chat*/}
          <XSChatContainer>
            <EmbedLiveChat videoId={videoId} showCloseButton />
          </XSChatContainer>

          {/* max-w-[1536px] */}
          <section className="grid max-w-screen-2xl mx-auto gap-y-4 lg:grid-cols-5">
            {/* タイトル、投稿者情報 */}
            <PadSection
              left
              className="gap-y-4 @xs:col-span-full @4xl:col-span-3"
            >
              <MaximizeButton />
              <StreamBasicInfo stream={stream} />
              <div className="@xs:block @4xl:hidden">
                <OpenChatButton />
              </div>
              <ChatCounts stream={stream} chatCounts={chatCounts} />
            </PadSection>

            {/* Open Chat Button & Related Videos */}
            <PadSection
              right
              className="gap-y-4 @xs:col-span-full @4xl:col-span-2"
            >
              <div className="hidden @4xl:block">
                <OpenChatButton />
              </div>
              <RelatedVideos />
            </PadSection>
          </section>
        </Page>
      </MainContainer>

      {/* Large: Chat */}
      <LgChatContainer>
        <EmbedLiveChat videoId={videoId} showCloseButton />
      </LgChatContainer>
    </div>
  )
}
