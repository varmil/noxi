import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import Schedule from 'features/hololive/schedule/components/Schedule'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.index.card')

  return (
    <main className="min-h-screen">
      <section className="p-4 sm:px-6 md:gap-8">
        <Schedule title={t('title')} description={t('description')} />
      </section>
    </main>
  )
}
