import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroup } from 'apis/groups'
import { IndexTemplate } from 'app/[locale]/(end-user)/(default)/[group]/live/_components/IndexTemplate'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group: groupId } = await props.params
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.group.live.metadata'
  })

  let groupName: string
  if (groupId === 'all') {
    groupName = tg('group.all')
  } else {
    const group = await getGroup(groupId)
    if (!group) {
      throw new Error('Group not found for live page (metadata)')
    }
    groupName = group.name
  }

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default async function GroupLivePage(props: Props) {
  const { locale, group: groupId } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const t = await getTranslations('Breadcrumb')
  const global = await getTranslations('Global')

  let groupName: string
  if (groupId === 'all') {
    groupName = global('group.all')
  } else {
    const group = await getGroup(groupId)
    if (!group) {
      throw new Error('Group not found for live page')
    }
    groupName = group.name
  }

  return (
    <Page
      breadcrumb={[
        { href: `/${groupId}`, name: groupName },
        { href: `/${groupId}/live`, name: t('live') }
      ]}
      h1={`${groupName} ${t('live')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <IndexTemplate />
    </Page>
  )
}
