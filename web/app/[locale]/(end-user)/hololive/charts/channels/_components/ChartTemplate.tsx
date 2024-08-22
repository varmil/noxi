import { PropsWithoutRef } from 'react'
import { HololiveChart } from 'features/hololive/chart/components/HololiveChart'

type Props = {}

export async function ChartTemplate({}: PropsWithoutRef<Props>) {
  return (
    <main className="min-h-screen">
      <section className="p-4 sm:px-6 md:gap-8">
        <HololiveChart limit={1000} />
      </section>
    </main>
  )
}
