import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getSupersBundle } from 'apis/supers/getSupersBundle'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import DefaultLayout from 'components/layouts/DefaultLayout'
import AutoRouterRefresh from 'components/router/AutoRouterRefresh'
import { setGroup } from 'lib/server-only-context/cache'
import { formatMicrosAsRoundedAmount } from 'utils/amount'
import { getAlternates } from 'utils/metadata/getAlternates'
import DefaultModeTemplate from '../template/DefaultModeTemplate'

const TITLE_MAX_LENGTH = 22

export type LiveIdBasePageProps = {
  params: Promise<{ locale: string; videoId: string }>
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

  const [t, tGlobal, , bundle, superChats] = await Promise.all([
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: props.namespace
    }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Global'
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

  // 100万円以上であればindex + hreflang, それ未満ならnoindex
  const indexOption =
    bundle?.amountMicros && bundle.amountMicros >= BigInt(1_000_000 * 1_000_000)
      ? {
          alternates: getAlternates({
            pathname: `/youtube/live/${videoId}`,
            locale
          })
        }
      : { robots: { index: false } }

  return {
    title: `${t('title', { title: slicedTitle })} - ${tGlobal('title')}`,
    description: `${t('description', {
      superChat: formatMicrosAsRoundedAmount(bundle?.amountMicros ?? BigInt(0)),
      concurrentViewers: peakConcurrentViewers.toLocaleString(),
      comment: comment
    })}`,
    ...indexOption
  }
}

export default async function LiveIdBasePage(props: PropsWithChildren<Props>) {
  const { locale, videoId } = await props.params
  const { group, status } = await getStream(videoId)

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(group)

  return (
    <Container status={status}>
      <DefaultLayout>
        <DefaultModeTemplate videoId={videoId}>
          {props.children}
        </DefaultModeTemplate>
      </DefaultLayout>
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
