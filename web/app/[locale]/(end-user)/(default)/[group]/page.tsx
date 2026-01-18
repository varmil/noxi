import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'
import { getAlternates } from 'utils/metadata/getAlternates'
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
  const [tg, t, groupName] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Page.group.index.metadata'
    }),
    getGroupName(groupId, { errorContext: 'group page (metadata)' })
  ])

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`,
    alternates: getAlternates({ pathname: `/${groupId}`, locale })
  }
}

export default async function GroupPage(props: Props) {
  const { locale, group: groupId } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const [feat, breadcrumbT, groupName] = await Promise.all([
    getTranslations('Features.group'),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Breadcrumb' }),
    getGroupName(groupId, { errorContext: 'group page' })
  ])

  return (
    <Page
      breadcrumb={[
        { href: '/groups', name: breadcrumbT('groupList') },
        { href: `/${groupId}`, name: groupName }
      ]}
      h1={`${groupName} ${feat('overview.nav')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <IndexTemplate />
    </Page>
  )
}
