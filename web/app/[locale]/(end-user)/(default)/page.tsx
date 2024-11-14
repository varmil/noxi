import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import dayjs from 'lib/dayjs'
import { getOgUrl } from 'utils/og-url'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: { locale: string }
  searchParams: { date?: string }
}

export async function generateMetadata({
  params: { locale },
  searchParams: { date }
}: Props): Promise<Metadata> {
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
    }
  }
}

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)

  return (
    <Page breadcrumb={[]}>
      <IndexTemplate />
    </Page>
  )
}
