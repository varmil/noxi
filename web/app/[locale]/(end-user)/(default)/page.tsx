import { use } from 'react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { routing } from 'config/i18n/routing'
import dayjs from 'lib/dayjs'
import { getOgUrl } from 'utils/og-url'
import { getWebUrl } from 'utils/web-url'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ date?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [{ date }, global, page] = await Promise.all([
    props.searchParams,
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.index' })
  ])
  const searchParams = new URLSearchParams({
    ...(date && { date: dayjs(date).toISOString() })
  })

  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: `${page('metadata.description')}`,
    openGraph: {
      images: [{ url: getOgUrl(`/daily-ranking?${searchParams.toString()}`) }]
    },
    alternates: { canonical: `${getWebUrl()}/${locale}` }
  }
}

export default function IndexPage(props: Props) {
  const { locale } = use(props.params)

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page breadcrumb={[]}>
      <IndexTemplate />
    </Page>
  )
}
