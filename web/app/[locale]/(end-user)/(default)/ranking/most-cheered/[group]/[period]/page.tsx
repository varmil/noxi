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
    title: '応援ランキング - VCharts',
    robots: { index: false }
  }
}

export default async function RankingMostCheeredPage(props: Props) {
  const { locale } = await props.params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page
      breadcrumb={[
        {
          href: '#',
          name: '応援ランキング'
        }
      ]}
      noPadding
      fullWidth
    >
      <IndexTemplate />
    </Page>
  )
}
