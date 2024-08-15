import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.charts')

  return (
    <main className="min-h-screen">
      <section className="p-4 sm:px-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('cardTitle')}</CardTitle>
            <CardDescription>{t('cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>hello</CardContent>
        </Card>
      </section>
    </main>
  )
}
