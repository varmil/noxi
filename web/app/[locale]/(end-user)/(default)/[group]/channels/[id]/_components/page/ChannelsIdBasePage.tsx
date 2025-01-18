import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import LocalNavigationForChannelsIdPages from 'features/channel/components/local-navigation/LocalNavigationForChannelsIdPages'
import { setGroup } from 'lib/server-only-context/cache'
import { ChannelProfile } from '../ui/profile/ChannelProfile'

export type ChannelsIdBasePageProps = {
  params: Promise<{ locale: string; group: GroupString; id: string }>
}
type Props = ChannelsIdBasePageProps

export async function generateBaseMetadata(
  props: Props & {
    namespace:
      | 'Page.group.channelsId.index.metadata'
      | 'Page.group.channelsId.superChat.metadata'
      | 'Page.group.channelsId.asmr.metadata'
      | 'Page.group.channelsId.live.metadata'
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
    })}`
  }
}

export default async function ChannelsIdBasePage(
  props: PropsWithChildren<Props>
) {
  const { locale, group, id } = await props.params

  // Enable static rendering
  setRequestLocale(locale)
  setGroup(group)

  const [{ basicInfo }, tg, t] = await Promise.all([
    getChannel(id),
    getTranslations('Global'),
    getTranslations('Breadcrumb')
  ])

  return (
    <Page
      breadcrumb={[
        {
          href: `/groups`,
          name: (await getTranslations('Page.groups.metadata'))('title')
        },
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: `/${group}/charts/channels`, name: t('channels') },
        { href: '#', name: basicInfo.title }
      ]}
    >
      <section className="flex flex-col">
        <ChannelProfile basicInfo={basicInfo} />
        <section>
          <LocalNavigationForChannelsIdPages channelId={id} />
        </section>

        <section>{props.children}</section>
      </section>
    </Page>
  )
}
