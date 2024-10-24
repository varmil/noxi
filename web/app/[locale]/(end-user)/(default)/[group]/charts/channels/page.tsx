import { use } from "react";
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ChartTemplate } from 'app/[locale]/(end-user)/(default)/[group]/charts/channels/_components/ChartTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: Promise<{ locale: string; group: GroupString }>
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    group
  } = params;

  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.group.charts' })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('metadata.title', { group: groupName })} - ${tg('title')}`,
    description: `${t('metadata.description', { group: groupName })}`
  }
}

export default function GroupChartsPage(props: Props) {
  const params = use(props.params);

  const {
    locale,
    group
  } = params;

  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  const tg = useTranslations('Global')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: `/${group}/charts/channels`, name: t('channels') }
      ]}
    >
      <ChartTemplate />
    </Page>
  )
}
