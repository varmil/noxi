import { Suspense } from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import TicketSummary from './_components/TicketSummary'
import TicketUsageHistory from './_components/TicketUsageHistory'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Page.dashboard.tickets')
  return {
    title: `${t('title')} - マイページ - VCharts`
  }
}

function TicketSummarySkeleton() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-16" />
            </div>
          </div>
          <Skeleton className="h-9.5 w-48" />
        </div>
      </CardContent>
    </Card>
  )
}

function TicketUsageHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function TicketsPage() {
  const t = await getTranslations('Page.dashboard.tickets')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Suspense fallback={<TicketSummarySkeleton />}>
        <TicketSummary />
      </Suspense>

      <Suspense fallback={<TicketUsageHistorySkeleton />}>
        <TicketUsageHistory />
      </Suspense>
    </div>
  )
}
