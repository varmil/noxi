import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { getChannel } from 'apis/youtube/getChannel'
import { Page } from 'components/page'
import { setGroup } from 'lib/server-only-context/cache'
import { getAlternates } from 'utils/metadata/getAlternates'
import { PosterRankingTemplate } from './_components/PosterRankingTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: string
    id: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group, id } = await props.params
  const [{ basicInfo }, t, tg] = await Promise.all([
    getChannel(id),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Page.group.channelsId.hyperChat.posterRanking.metadata'
    }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Global'
    })
  ])
  return {
    title: `${t('title', { channel: basicInfo.title })} - ${tg('title')}`,
    description: `${t('description', { channel: basicInfo.title })}`,
    alternates: getAlternates({
      pathname: `/${group}/channels/${id}/hyper-chat/poster-ranking`,
      locale
    })
  }
}

export default async function GroupChannelsIdHyperChatPosterRankingPage(
  props: Props
) {
  const { locale, group, id } = await props.params

  setRequestLocale(locale as 'ja' | 'en')
  setGroup(group)

  const [{ basicInfo }, t, groupName] = await Promise.all([
    getChannel(id),
    getTranslations('Breadcrumb'),
    getGroupName(group, { errorContext: 'poster ranking page' })
  ])

  return (
    <Page
      breadcrumb={[
        { href: '/groups', name: t('groupList') },
        { href: `/${group}`, name: groupName },
        { href: `/${group}/channels/${id}`, name: basicInfo.title },
        {
          href: `/${group}/channels/${id}/hyper-chat/poster-ranking`,
          name: t('posterRanking')
        }
      ]}
    >
      <PosterRankingTemplate channelId={id} group={group} />
    </Page>
  )
}
