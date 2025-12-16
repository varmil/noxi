import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
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
  const [tg, t, groupName] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.group.charts' }),
    getGroupName(groupId, { errorContext: 'charts page (metadata)' })
  ])

  return {
    title: `${t('metadata.title', { group: groupName })} - ${tg('title')}`,
    description: `${t('metadata.description', { group: groupName })}`
  }
}

export default async function GroupChartsPage(props: Props) {
  const { locale, group: groupId } = await props.params
  const searchParams = await props.searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const [t, groupName] = await Promise.all([
    getTranslations('Breadcrumb'),
    getGroupName(groupId, { errorContext: 'charts page' })
  ])

  return (
    <Page
      breadcrumb={[
        { href: `/${groupId}`, name: groupName },
        { href: `/${groupId}/charts/channels`, name: t('channels') }
      ]}
      h1={`${groupName} ${t('channels')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <ChartTemplate searchParams={searchParams} />
    </Page>
  )
}
