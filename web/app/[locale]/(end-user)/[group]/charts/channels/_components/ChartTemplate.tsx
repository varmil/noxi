import { PropsWithoutRef } from 'react'
import { HololiveChart } from 'features/hololive/chart/components/HololiveChart'

type Props = {}

export async function ChartTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <HololiveChart limit={1000} />
    </>
  )
}
