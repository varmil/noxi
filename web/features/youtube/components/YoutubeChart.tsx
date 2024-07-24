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
import { ChannelCards } from 'features/youtube/components/channel/ChannelCards'
import { FilterAndSort } from 'features/youtube/components/chart/channel/FilterAndSort'

type Props = {
  keyword: string
  searchParams: URLSearchParams
}

export async function YoutubeChart({
  keyword,
  searchParams
}: PropsWithoutRef<Props>) {
  const t = await getTranslations('YoutubeDashboard')

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main>
        <section className="mt-4 px-1 sm:mt-0 sm:px-6">
          <FilterAndSort />
        </section>

        <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>{keyword} | Channels</CardTitle>
              <CardDescription>{t('description', { keyword })}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p>Loading cards...</p>}>
                <ChannelCards searchParams={searchParams} />
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
