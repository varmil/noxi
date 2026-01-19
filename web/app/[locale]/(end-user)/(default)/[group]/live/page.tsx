import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { IndexTemplate } from 'app/[locale]/(end-user)/(default)/[group]/live/_components/IndexTemplate'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'
import { getAlternates } from 'utils/metadata/getAlternates'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group: groupId } = await props.params
  const [tg, t, groupName] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Page.group.live.metadata'
    }),
    getGroupName(groupId, { errorContext: 'live page (metadata)' })
  ])

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`,
    alternates: getAlternates({ pathname: `/${groupId}/live`, locale })
  }
}

export default async function GroupLivePage(props: Props) {
  const { locale, group: groupId } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const [t, groupName] = await Promise.all([
    getTranslations('Breadcrumb'),
    getGroupName(groupId, { errorContext: 'live page' })
  ])

  return (
    <Page
      breadcrumb={[
        { href: '/groups', name: t('groupList') },
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
