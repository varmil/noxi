import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { Page } from 'components/page'
import LocalNavigationForLiveIdPages from 'features/live/components/local-navigation/LocalNavigationForLiveIdPages'
import {
  MainContainer,
  LgChatContainer,
  XSChatContainer
} from '../layouts/default/Default'
import PadSection from '../layouts/default/PadSection'
import MaximizeButton from '../ui/button/MaximizeButton'
import OpenChatButton from '../ui/button/OpenChatButton'
import RelatedVideos from '../ui/related-videos/RelatedVideos'
import EmbedLiveChat from '../ui/stream/EmbedLiveChat'
import EmbedStream from '../ui/stream/EmbedStream'

type Props = {
  videoId: string
}

export default async function DefaultModeTemplate({
  videoId,
  children
}: PropsWithChildren<Props>) {
  const stream = await getStream(videoId)
  const {
    snippet: { channelId, title, thumbnails },
    group
  } = stream

  const [tg, t, { basicInfo }] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Breadcrumb'),
    getChannel(channelId)
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

          <XSChatContainer>
            <EmbedLiveChat videoId={videoId} showCloseButton />
          </XSChatContainer>

          {/* max-w-[1536px] */}
          <section className="grid max-w-(--breakpoint-2xl) mx-auto gap-y-4 @4xl:grid-cols-5">
            <PadSection left className="@xs:col-span-full @4xl:col-span-3">
              {/* サブページのTemplateに委譲する */}
              <LocalNavigationForLiveIdPages videoId={videoId} />
              {children}
            </PadSection>

            {/* Related Videos */}
            <PadSection
              right
              className="hidden @4xl:flex @4xl:gap-y-4 @4xl:col-span-2"
            >
              <div className="flex items-center gap-x-2">
                <OpenChatButton className="flex-1" />
                <MaximizeButton />
              </div>
              <RelatedVideos channelId={channelId} />
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
