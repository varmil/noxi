import { Check } from 'lucide-react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Page } from 'components/page'
import { routing } from 'config/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{}>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.auth.verifyRequest' })
  ])

  return {
    title: `${page('title')} - ${global('title')}`,
    description: `${page('description')}`,
    robots: { index: false }
  }
}

export default function VerifyRequest() {
  const page = useTranslations('Page.auth.verifyRequest')
  return (
    <Page className="flex flex-col items-center justify-center min-h-[70vh] mt-12 sm:mt-20">
      <Card className="">
        <CardHeader className="flex items-center gap-4">
          <Check className="size-6 stroke-green-600" />
          <section>
            <CardTitle className="text-xl font-bold mb-1">
              {page('title')}
            </CardTitle>
            <CardDescription className="ml-0.5">
              {page('description')}
            </CardDescription>
          </section>
        </CardHeader>
        <CardContent>
          <p className="max-w-md">{page('content')}</p>
        </CardContent>
      </Card>
    </Page>
  )
}
