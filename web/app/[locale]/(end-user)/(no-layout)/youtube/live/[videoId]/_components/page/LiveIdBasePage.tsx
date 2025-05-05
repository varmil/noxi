import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { getSupersBundle } from 'apis/youtube/getSupersBundle'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import DefaultLayout from 'components/layouts/DefaultLayout'
import TheaterLayout from 'components/layouts/TheaterLayout'
import AutoRouterRefresh from 'components/router/AutoRouterRefresh'
import { setGroup } from 'lib/server-only-context/cache'
import { formatMicrosAsRoundedAmount } from 'utils/amount'
import LayoutFactory from '../layouts/LayoutFactory'
import DefaultModeTemplate from '../template/DefaultModeTemplate'
import TheaterModeTemplate from '../template/TheaterModeTemplate'

const TITLE_MAX_LENGTH = 22

export type LiveIdBasePageProps = {
  params: Promise<{ locale: Locale; videoId: string }>
  searchParams?: Promise<{ theater?: '1' }>
}
type Props = LiveIdBasePageProps

export async function generateBaseMetadata(
  props: Props & { namespace: 'Page.youtube.live.id.index.metadata' }
): Promise<Metadata> {
  const { locale, videoId } = await props.params
  const {
    metrics: { peakConcurrentViewers },
    snippet: { title, channelId },
    membersOnly
  } = await getStream(videoId)

  const [t, { basicInfo }, bundle, superChats] = await Promise.all([
    getTranslations({
      locale,
      namespace: props.namespace
    }),
    getChannel(channelId),
    getSupersBundle(videoId),
    getSuperChats({
      videoId,
      userCommentNotNull: true,
      orderBy: [
        { field: 'amountMicros', order: 'desc' },
        { field: 'createdAt', order: 'desc' }
      ],
      limit: 2
    })
  ])

  const slicedTitle =
    title.length > TITLE_MAX_LENGTH
      ? title.slice(0, TITLE_MAX_LENGTH - 1) + '…'
      : title

  const comment = membersOnly
    ? t('commentForMembersOnly')
    : superChats.map(s => s.userComment).join(', ')

  return {
    title: `${t('title', { title: slicedTitle, channel: basicInfo.title })}`,
    description: `${t('description', {
      superChat: formatMicrosAsRoundedAmount(bundle?.amountMicros ?? BigInt(0)),
      concurrentViewers: peakConcurrentViewers.toLocaleString(),
      comment: comment
    })}`,
    // alternates: {
    //   canonical: `${getWebUrl()}/${locale}/youtube/live/${videoId}`
    // }
    robots: { index: false } // 2025/05/04 noindexを試す
  }
}

export default async function LiveIdBasePage(props: PropsWithChildren<Props>) {
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
            <DefaultModePage videoId={videoId}>
              {props.children}
            </DefaultModePage>
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

async function DefaultModePage({
  videoId,
  children
}: PropsWithChildren<{ videoId: string }>) {
  return <DefaultModeTemplate videoId={videoId}>{children}</DefaultModeTemplate>
}

async function TheaterModePage({ videoId }: { videoId: string }) {
  return <TheaterModeTemplate videoId={videoId} />
}
