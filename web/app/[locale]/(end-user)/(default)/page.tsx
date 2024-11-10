import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.index' })

  const {
    NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_BRANCH_URL,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  } = process.env

  let URL = ''
  switch (NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      URL = `https://${NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? ''}`
      break
    case 'preview':
      URL = `https://${NEXT_PUBLIC_VERCEL_BRANCH_URL ?? ''}`
      break
    default:
      URL = 'http://localhost:3000'
  }

  return {
    title: `${t('metadata.title')} - ${tg('title')}`,
    description: `${t('metadata.description')}`,
    openGraph: { images: [{ url: `${URL}/api/og/daily-ranking` }] }
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
