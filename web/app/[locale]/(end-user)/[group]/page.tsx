import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/[group]/_components/IndexTemplate'
import Page from 'components/Page'
import Site from 'config/constants/Site'

type Props = {
  params: { locale: string; group: string }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

/**
 * The Root of the Group Page
 */
export function generateStaticParams(): { group: string }[] {
  return Site.Groups.map(group => ({ group }))
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.hololive.index.metadata'
  })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function HololivePage({ params: { locale, group } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Breadcrumb')

  // TODO: modify link href
  return (
    <Page breadcrumb={[{ href: '/hololive', name: t('hololive') }]}>
      <IndexTemplate />
    </Page>
  )
}
