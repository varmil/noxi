import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Group'
import { routing } from 'config/i18n/routing'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { ChannelGallerySearchParams } from 'features/group/types/channel-gallery'
import { setGroup } from 'lib/server-only-context/cache'
import { ChartTemplate } from './_components/ChartTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: GroupString
  }>
  searchParams: Promise<ChannelGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' })
  const t = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.group.charts' })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('metadata.title', { group: groupName })} - ${tg('title')}`,
    description: `${t('metadata.description', { group: groupName })}`
  }
}

export default function GroupChartsPage(props: Props) {
  const { locale, group } = use(props.params)
  const searchParams = use(props.searchParams)

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(group)

  const t = useTranslations('Breadcrumb')
  const groupName = t('group', {
    group: useTranslations('Global')(`group.${group}`)
  })

  return (
    <Page
      breadcrumb={[
        { href: `/${group}`, name: groupName },
        { href: `/${group}/charts/channels`, name: t('channels') }
      ]}
      h1={`${groupName} ${t('channels')}`}
    >
      <LocalNavigationForGroupPages group={group} />
      <ChartTemplate searchParams={searchParams} />
    </Page>
  )
}
