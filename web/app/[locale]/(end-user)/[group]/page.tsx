import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/[group]/_components/IndexTemplate'
import Page from 'components/Page'
import Site from 'config/constants/Site'

type Props = {
  params: { locale: string; group: (typeof Site.Groups)[number] }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

/**
 * The Root of the Group Page
 */
export function generateStaticParams(): { group: string }[] {
  return Site.Groups.map(group => ({ group }))
}

export async function generateMetadata({
  params: { locale, group }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.index.metadata'
  })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description', { group: tg(`group.${group}`) })}`
  }
}

export default function HololivePage({ params: { locale, group } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const tg = useTranslations('Global')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        { href: `/${group}`, name: t('group', { group: tg(`group.${group}`) }) }
      ]}
    >
      <IndexTemplate group={group} />
    </Page>
  )
}
