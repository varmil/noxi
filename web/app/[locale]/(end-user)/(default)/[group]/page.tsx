import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroup } from 'apis/groups'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
  searchParams?: Promise<ConstructorParameters<typeof URLSearchParams>[0]>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group: groupId } = await props.params
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.group.index.metadata'
  })
  const group = await getGroup(groupId)
  if (!group) {
    throw new Error('Group not found for group page (metadata)')
  }

  return {
    title: `${t('title', { group: group.name })} - ${tg('title')}`,
    description: `${t('description', { group: group.name })}`
  }
}

export default async function GroupPage(props: Props) {
  const { locale, group: groupId } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const t = await getTranslations('Breadcrumb')
  const feat = await getTranslations('Features.group')

  const group = await getGroup(groupId)
  if (!group) {
    throw new Error('Group not found for group page')
  }

  const groupName = t('group', { group: group.name })

  return (
    <Page
      breadcrumb={[{ href: `/${groupId}`, name: groupName }]}
      h1={`${groupName} ${feat('overview.nav')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <IndexTemplate />
    </Page>
  )
}
