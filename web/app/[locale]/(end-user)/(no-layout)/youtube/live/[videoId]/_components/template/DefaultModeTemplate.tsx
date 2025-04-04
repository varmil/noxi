import { PropsWithChildren, Suspense } from 'react'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { Page } from 'components/page'
import LiveIdXXXTemplateSkeleton from 'components/skeleton/LiveIdXXXTemplateSkeleton'
import LocalNavCommentsTab from 'features/live/local-navigation/components/LocalNavCommentsTab'
import LocalNavigationForLiveIdPages from 'features/live/local-navigation/components/LocalNavigationForLiveIdPages'
import {
  MainContainer,
  LgChatContainer,
  XSChatContainer
} from '../layouts/default/Default'
import MaximizeButton from '../ui/button/MaximizeButton'
import OpenChatButton from '../ui/button/OpenChatButton'
import StreamAndGradeSection from '../ui/section/StreamAndGradeSection'
import VideoStatsSection from '../ui/section/VideoStatsSection'
import EmbedLiveChat from '../ui/stream/EmbedLiveChat'

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

  const [{ basicInfo }] = await Promise.all([getChannel(channelId)])

  return (
    <div className="grid grid-cols-1 lg:flex lg:gap-x-0">
      <MainContainer>
        <Page
          className="space-y-4"
          breadcrumb={[
            {
              href: `/${group}/channels/${basicInfo.id}`,
              name: basicInfo.title
            },
            { href: '#', name: title }
          ]}
        >
          {/* Stream & Grade (lg+) */}
          <StreamAndGradeSection
            videoId={videoId}
            url={thumbnails.maxres?.url || ''}
          />

          <XSChatContainer>
            <EmbedLiveChat videoId={videoId} showCloseButton />
          </XSChatContainer>

          {/* max-w-[1536px] */}
          <section className="grid max-w-(--breakpoint-2xl) mx-auto gap-y-4 gap-x-6 @4xl:grid-cols-[1fr_350px] @6xl:grid-cols-[1fr_400px]">
            <div>
              <LocalNavigationForLiveIdPages
                videoId={videoId}
                commentsTab={<LocalNavCommentsTab videoId={videoId} />}
              />
              {/* サブページのTemplateに委譲する */}
              <Suspense fallback={<LiveIdXXXTemplateSkeleton />}>
                {children}
              </Suspense>
            </div>

            {/* lg+ */}
            <div className="hidden @4xl:pt-3 @4xl:block">
              <div className="flex items-center gap-x-2 pb-10">
                <OpenChatButton className="flex-1" />
                <MaximizeButton />
              </div>
              <VideoStatsSection stream={stream} />
            </div>
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
