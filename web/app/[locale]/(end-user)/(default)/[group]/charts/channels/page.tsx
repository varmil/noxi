import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ChartTemplate } from 'app/[locale]/(end-user)/(default)/[group]/charts/channels/_components/ChartTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: { locale: string; group: GroupString }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

export async function generateMetadata({
  params: { locale, group }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.group.charts' })

  return {
    title: `${t('title', { group: tg(`group.${group}`) })} | ${tg('title')}`,
    description: `${t('description', { group: tg(`group.${group}`) })}`
  }
}

export default function GroupChartsPage({ params: { locale, group } }: Props) {
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
