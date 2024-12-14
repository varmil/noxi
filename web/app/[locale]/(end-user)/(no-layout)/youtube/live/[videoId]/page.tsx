import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import DefaultModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/DefaultModeTemplate'
import TheaterModeTemplate from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/mode/TheaterModeTemplate'
import DefaultLayout from 'components/layouts/DefaultLayout'
import TheaterLayout from 'components/layouts/TheaterLayout'
import AutoRouterRefresh from 'components/router/AutoRouterRefresh'
import { setGroup } from 'lib/server-only-context/cache'
import LayoutFactory from './_components/layouts/LayoutFactory'

const TITLE_MAX_LENGTH = 22

type Props = {
  params: Promise<{ locale: string; videoId: string }>
  searchParams?: Promise<{ theater?: '1' }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, videoId } = await props.params
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.live.id.metadata'
  })
  const {
    snippet: { title, channelId }
  } = await getStream(videoId)
  const { basicInfo } = await getChannel(channelId)

  return {
    title: `${t('title', {
      title:
        title.length > TITLE_MAX_LENGTH
          ? title.slice(0, TITLE_MAX_LENGTH - 1) + '…'
          : title,
      channel: basicInfo.title
    })}`,
    description: `${t('description', { channel: basicInfo.title })}`
  }
}

export default async function YoutubeLiveIdPage(props: Props) {
  const { locale, videoId } = await props.params
  const { group, status } = await getStream(videoId)

  // Enable static rendering
  setRequestLocale(locale)
  setGroup(group)

  return (
    <Container status={status}>
      <LayoutFactory
        DefaultLayout={
          <DefaultLayout>
            <DefaultModePage videoId={videoId} />
          </DefaultLayout>
        }
        TheaterLayout={
          <TheaterLayout>
            <TheaterModePage videoId={videoId} />
          </TheaterLayout>
        }
      />
    </Container>
  )
}

/**
 * live onlyにするのが最も効率が良いが
 * schedule中に閲覧を始めた場合リフレッシュされないので
 * live or scheduled としている
 */
async function Container({
  children,
  status
}: PropsWithChildren<{ status: StreamSchema['status'] }>) {
  if (status === 'live' || status === 'scheduled') {
    return (
      <AutoRouterRefresh intervalMs={2 * 60000}>{children}</AutoRouterRefresh>
    )
  } else {
    return children
  }
}

async function DefaultModePage({ videoId }: { videoId: string }) {
  return <DefaultModeTemplate videoId={videoId} />
}

async function TheaterModePage({ videoId }: { videoId: string }) {
  return <TheaterModeTemplate videoId={videoId} />
}
