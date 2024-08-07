import { PropsWithoutRef, Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { ChannelCards } from 'components/youtube/channel/ChannelCards'
import { FilterAndSort } from 'features/youtube/components/chart/channel/FilterAndSort'
import { getChartOfChannels } from '../api/getChartOfChannels'

type Props = {
  searchParams: URLSearchParams
}

export async function YoutubeChart({ searchParams }: PropsWithoutRef<Props>) {
  const t = await getTranslations('YoutubeDashboard')
  const channels = await getChartOfChannels({ searchParams })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main>
        <section className="mt-4 px-1 sm:mt-0 sm:px-6">
          <FilterAndSort />
        </section>

        <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>{'Travel vlog english'} | Channels</CardTitle>
              <CardDescription>
                {t('description', { keyword: 'Travel vlog english' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p>Loading cards...</p>}>
                <ChannelCards channels={channels} />
              </Suspense>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-50</strong> of <strong>706789 </strong>
                channels
              </div>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  )
}
