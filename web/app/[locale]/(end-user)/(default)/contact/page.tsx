import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const global = await getTranslations({ locale, namespace: 'Global' })
  const page = await getTranslations({ locale, namespace: 'Page.contact' })

  return {
    title: `${page('title')} - ${global('title')}`,
    description: `${page('description')}`
  }
}

export default async function ContactPage(props: Props) {
  const { locale } = await props.params
  const page = await getTranslations({ locale, namespace: 'Page.contact' })

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <Page
      breadcrumb={[{ href: `/contact`, name: page('title') }]}
      className="flex flex-col items-center justify-center mx-auto gap-y-10"
      noPadding
    >
      <h1 className="sr-only">{page('title')}</h1>
      <iframe
        className="h-[1440px] sm:h-[1150px] md:h-[1100px]"
        src="https://docs.google.com/forms/d/e/1FAIpQLSepa1SF-AMhezTuYF0hnpdi-5rQzfTe9_aO_nestdBP1vqrjA/viewform?embedded=true"
        width="100%"
        height="1470"
      >
        読み込んでいます…
      </iframe>
    </Page>
  )
}
