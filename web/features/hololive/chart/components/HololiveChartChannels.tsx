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

export async function HololiveChartChannels({
  searchParams
}: PropsWithoutRef<Props>) {
  const t = await getTranslations('YoutubeDashboard')
  const channels = await getChartOfChannels({ searchParams })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main>
        {/* <section className="mt-4 px-1 sm:mt-0 sm:px-6">
          <FilterAndSort />
        </section> */}

        <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>{'ホロライブ'} | Hololive</CardTitle>
              <CardDescription>ホロライブのメンバー一覧です。</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p>Loading cards...</p>}>
                <ChannelCards channels={channels} />
              </Suspense>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
