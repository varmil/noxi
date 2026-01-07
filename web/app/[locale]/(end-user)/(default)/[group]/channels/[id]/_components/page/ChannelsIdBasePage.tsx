import { PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { Page } from 'components/page'
import ChannelsIdXXXTemplateSkeleton from 'components/skeleton/ChannelsIdXXXTemplateSkeleton'

import LocalNavigationForChannelsIdPages from 'features/channel/components/local-navigation/LocalNavigationForChannelsIdPages'
import { setGroup } from 'lib/server-only-context/cache'
import { getWebUrl } from 'utils/web-url'
import { ChannelProfileTemplate } from '../ui/profile/ChannelProfileTemplate'

export type ChannelsIdBasePageProps = {
  params: Promise<{
    locale: string
    group: string
    id: string
  }>
}
type Props = ChannelsIdBasePageProps

export async function generateBaseMetadata(
  props: Props & {
    namespace:
      | 'Page.group.channelsId.index.metadata'
      | 'Page.group.channelsId.superChat.metadata'
      | 'Page.group.channelsId.asmr.metadata'
      | 'Page.group.channelsId.live.metadata'
      | 'Page.group.channelsId.comments.metadata'
      | 'Page.group.channelsId.concurrentViewers.metadata'
      | 'Page.group.channelsId.streamTimes.metadata'
      | 'Page.group.channelsId.faq.metadata'
  }
): Promise<Metadata> {
  const { locale, group, id } = await props.params
  const [{ basicInfo }, t] = await Promise.all([
    getChannel(id),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: props.namespace
    })
  ])
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  return {
    title: `${t('title', { channel: basicInfo.title })} - ${tg('title')}`,
    description: `${t('description', {
      channel: basicInfo.title
    })}`,
    alternates: {
      canonical: `${getWebUrl()}/${locale}/${group}/channels/${id}`
    }
  }
}

export default async function ChannelsIdBasePage(
  props: PropsWithChildren<Props>
) {
  const { locale, group, id } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(group)

  const [channel, t] = await Promise.all([
    getChannel(id),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Breadcrumb' })
  ])

  return (
    <Page
      breadcrumb={[
        {
          href: `/ranking/super-chat/channels/all/last30Days`,
          name: t('superChatRanking')
        },
        { href: `/${group}/channels/${id}`, name: channel.basicInfo.title }
      ]}
    >
      <section className="flex flex-col">
        <ChannelProfileTemplate channel={channel} />
        <section>
          <LocalNavigationForChannelsIdPages channelId={id} group={group} />
        </section>

        <Suspense fallback={<ChannelsIdXXXTemplateSkeleton />}>
          <section>{props.children}</section>
        </Suspense>
      </section>
    </Page>
  )
}
