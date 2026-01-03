import { use } from 'react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { DaysOption, DEFAULT_DAYS } from 'features/charts/types/chart-filter'
import { getWebUrl } from 'utils/web-url'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ date?: string; days?: string; group?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.index' })
  ])

  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: `${page('metadata.description')}`,
    alternates: { canonical: `${getWebUrl()}/${locale}` }
  }
}

export default function IndexPage(props: Props) {
  const { locale } = use(props.params)
  const searchParams = use(props.searchParams)

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  const days = (Number(searchParams.days) || DEFAULT_DAYS) as DaysOption
  const group = searchParams.group

  return (
    <Page breadcrumb={[]}>
      <IndexTemplate days={days} group={group} />
    </Page>
  )
}
