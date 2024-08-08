import { PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { ChannelCards } from 'components/youtube/channel/ChannelCards'
import { getChartOfChannels } from 'features/hololive/chart/api/getChartOfChannels'

type Props = {
  searchParams: URLSearchParams
}

export async function ChartTemplate({ searchParams }: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.holilive.charts')
  const channels = await getChartOfChannels({ searchParams })

  return (
    <main className="min-h-screen">
      <section className="p-4 sm:px-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('cardTitle')}</CardTitle>
            <CardDescription>{t('cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p>Loading cards...</p>}>
              <ChannelCards channels={channels} hololive />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
