import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroup } from 'apis/groups'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { setGroup } from 'lib/server-only-context/cache'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
  searchParams: Promise<StreamGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group: groupId } = await props.params
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.group.ended.metadata'
  })

  let groupName: string
  if (groupId === 'all') {
    groupName = tg('group.all')
  } else {
    const group = await getGroup(groupId)
    if (!group) {
      throw new Error('Group not found for ended page (metadata)')
    }
    groupName = group.name
  }

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default async function GroupEndedPage(props: Props) {
  const { locale, group: groupId } = await props.params
  const searchParams = await props.searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const t = await getTranslations('Breadcrumb')
  const global = await getTranslations('Global')

  let groupDisplayName: string
  if (groupId === 'all') {
    groupDisplayName = global('group.all')
  } else {
    const group = await getGroup(groupId)
    if (!group) {
      throw new Error('Group not found for ended page')
    }
    groupDisplayName = group.name
  }

  const groupName = t('group', { group: groupDisplayName })

  return (
    <Page
      breadcrumb={[
        { href: `/${groupId}`, name: groupName },
        { href: `/${groupId}/ended`, name: t('ended') }
      ]}
      h1={`${groupName} ${t('ended')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <IndexTemplate searchParams={searchParams} />
    </Page>
  )
}
