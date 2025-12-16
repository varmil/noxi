import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
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

/**
 * 2025/12/15: header使ってる判定になってエラーになってしまうので、いったんコメントアウト
 */
// export async function generateStaticParams(): Promise<{ group: string }[]> {
//   try {
//     const groups = await getGroups()
//     return groups.map(group => ({ group: group.id }))
//   } catch (error) {
//     console.error('Failed to fetch groups for static params:', error)
//     // フォールバック: 空の配列を返すか、最小限のグループを返す
//     return []
//   }
// }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.group.index.metadata'
  })
  const groupName = (tg as any)(`group.${group}`)

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
    group: (useTranslations('Global') as any)(`group.${group}`)
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
