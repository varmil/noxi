import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ChartTemplate } from 'app/[locale]/(end-user)/(default)/[group]/charts/channels/_components/ChartTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: Promise<{ locale: string; group: GroupString }>
  searchParams?: Promise<ConstructorParameters<typeof URLSearchParams>[0]>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.group.charts' })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('metadata.title', { group: groupName })} - ${tg('title')}`,
    description: `${t('metadata.description', { group: groupName })}`
  }
}

export default function GroupChartsPage(props: Props) {
  const { locale, group } = use(props.params)

  // Enable static rendering
  setRequestLocale(locale)
  setGroup(group)

  const t = useTranslations('Breadcrumb')
  const groupName = t('group', {
    group: useTranslations('Global')(`group.${group}`)
  })

  return (
    <Page
      breadcrumb={[
        {
          href: `/groups`,
          name: useTranslations('Page.groups.metadata')('title')
        },
        { href: `/${group}`, name: groupName },
        { href: `/${group}/charts/channels`, name: t('channels') }
      ]}
      h1={`${groupName} ${t('channels')}`}
    >
      <LocalNavigationForGroupPages group={group} />
      <ChartTemplate />
    </Page>
  )
}
