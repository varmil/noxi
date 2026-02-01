import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    period: string
    group: string
  }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'トップファンランキング - VCharts',
    robots: { index: false }
  }
}

export default async function RankingTopFansPage(props: Props) {
  const { locale } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page
      breadcrumb={[
        {
          href: '#',
          name: 'トップファンランキング'
        }
      ]}
      noPadding
      fullWidth
    >
      <IndexTemplate />
    </Page>
  )
}
