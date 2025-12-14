import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { GroupString, GroupStrings } from 'config/constants/Group'
import { routing } from 'config/i18n/routing'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: GroupString
  }>
  searchParams?: Promise<ConstructorParameters<typeof URLSearchParams>[0]>
}

/**
 * The Root of the Group Page
 */
export function generateStaticParams(): { group: string }[] {
  return GroupStrings.map(group => ({ group }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' })
  const t = await getTranslations({ locale: locale as 'ja' | 'en',
    namespace: 'Page.group.index.metadata'
  })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default function GroupPage(props: Props) {
  const { locale, group } = use(props.params)

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(group)

  const t = useTranslations('Breadcrumb')
  const groupName = t('group', {
    group: useTranslations('Global')(`group.${group}`)
  })

  return (
    <Page
      breadcrumb={[{ href: `/${group}`, name: groupName }]}
      h1={`${groupName} ${useTranslations('Features.group')('overview.nav')}`}
    >
      <LocalNavigationForGroupPages group={group} />
      <IndexTemplate />
    </Page>
  )
}
