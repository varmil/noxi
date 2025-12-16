import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroup } from 'apis/groups'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { ChannelGallerySearchParams } from 'features/group/types/channel-gallery'
import { setGroup } from 'lib/server-only-context/cache'
import { ChartTemplate } from './_components/ChartTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
  searchParams: Promise<ChannelGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group: groupId } = await props.params
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.group.charts'
  })
  const group = await getGroup(groupId)
  if (!group) {
    throw new Error('Group not found for charts page (metadata)')
  }
  return {
    title: `${t('metadata.title', { group: group.name })} - ${tg('title')}`,
    description: `${t('metadata.description', { group: group.name })}`
  }
}

export default async function GroupChartsPage(props: Props) {
  const { locale, group: groupId } = await props.params
  const searchParams = await props.searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const t = await getTranslations('Breadcrumb')
  const group = await getGroup(groupId)
  if (!group) {
    throw new Error('Group not found for charts page')
  }

  return (
    <Page
      breadcrumb={[
        { href: `/${groupId}`, name: group.name },
        { href: `/${groupId}/charts/channels`, name: t('channels') }
      ]}
      h1={`${group.name} ${t('channels')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <ChartTemplate searchParams={searchParams} />
    </Page>
  )
}
