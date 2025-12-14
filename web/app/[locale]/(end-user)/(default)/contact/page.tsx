import { Lightbulb, Sun } from 'lucide-react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Page } from 'components/page'
import { routing } from 'config/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const global = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' })
  const page = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.contact' })

  return {
    title: `${page('title')} - ${global('title')}`,
    description: `${page('description')}`
  }
}

export default async function ContactPage(props: Props) {
  const { locale } = await props.params
  const page = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.contact' })

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page
      breadcrumb={[{ href: `/contact`, name: page('title') }]}
      className="flex flex-col items-center justify-center mx-auto gap-y-8"
      noPadding
    >
      <h1 className="sr-only">{page('title')}</h1>

      <section className="mx-4 hidden dark:block">
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>見やすくするには...</AlertTitle>
          <AlertDescription>
            <span>
              ページ右上の
              <Sun className="size-4 inline relative top-[-1px] mx-1" />
              をタップしてライトモードに切り替えることをおすすめします
            </span>
          </AlertDescription>
        </Alert>
      </section>

      <iframe
        className="h-[1440px] sm:h-[1200px] md:h-[1150px]"
        src="https://docs.google.com/forms/d/e/1FAIpQLSepa1SF-AMhezTuYF0hnpdi-5rQzfTe9_aO_nestdBP1vqrjA/viewform?embedded=true"
        width="100%"
        height="1440"
      >
        読み込んでいます…
      </iframe>
    </Page>
  )
}
