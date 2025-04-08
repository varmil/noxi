import { use } from 'react'
import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import dayjs from 'lib/dayjs'
import { getOgUrl } from 'utils/og-url'
import { getWebUrl } from 'utils/web-url'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ date?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const { date } = await props.searchParams
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.index' })

  const searchParams = new URLSearchParams({
    ...(date && { date: dayjs(date).toISOString() })
  })

  return {
    title: `${t('metadata.title')} - ${tg('title')}`,
    description: `${t('metadata.description')}`,
    openGraph: {
      images: [
        {
          url: getOgUrl(`/daily-ranking?${searchParams.toString()}`)
        }
      ]
    },
    alternates: {
      canonical: `${getWebUrl()}/${locale}`
    }
  }
}

export default function IndexPage(props: Props) {
  const { locale } = use(props.params)

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <Page breadcrumb={[]}>
      <IndexTemplate />
    </Page>
  )
}
