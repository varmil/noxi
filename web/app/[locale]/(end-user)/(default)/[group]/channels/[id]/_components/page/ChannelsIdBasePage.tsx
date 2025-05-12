import { PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { Page } from 'components/page'
import ChannelsIdXXXTemplateSkeleton from 'components/skeleton/ChannelsIdXXXTemplateSkeleton'
import { GroupString } from 'config/constants/Group'
import LocalNavigationForChannelsIdPages from 'features/channel/components/local-navigation/LocalNavigationForChannelsIdPages'
import { setGroup } from 'lib/server-only-context/cache'
import { getWebUrl } from 'utils/web-url'
import { ChannelProfile } from '../ui/profile/ChannelProfile'

export type ChannelsIdBasePageProps = {
  params: Promise<{ locale: Locale; group: GroupString; id: string }>
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
  const [{ basicInfo }, tg, t] = await Promise.all([
    getChannel(id),
    getTranslations({ locale, namespace: 'Global' }),
    getTranslations({ locale, namespace: props.namespace })
  ])
  return {
    title: `${t('title', { channel: basicInfo.title })} - ${tg('title')}`,
    description: `${t('description', {
      channel: basicInfo.title,
      group: tg(`group.${group}`)
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
  setRequestLocale(locale)
  setGroup(group)

  const [{ basicInfo, peakX }, tg, t] = await Promise.all([
    getChannel(id),
    getTranslations('Global'),
    getTranslations('Breadcrumb')
  ])

  return (
    <Page
      breadcrumb={[
        {
          href: `/${group}/charts/channels`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: `/${group}/channels/${id}`, name: basicInfo.title }
      ]}
    >
      <section className="flex flex-col">
        <ChannelProfile basicInfo={basicInfo} group={peakX.group} />
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
