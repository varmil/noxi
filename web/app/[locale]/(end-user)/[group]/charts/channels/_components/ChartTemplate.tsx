import { PropsWithoutRef } from 'react'
import Site from 'config/constants/Site'
import { HololiveChart } from 'features/hololive/chart/components/HololiveChart'

type Props = {
  group: (typeof Site.Groups)[number]
}

export async function ChartTemplate({ group }: PropsWithoutRef<Props>) {
  return (
    <>
      <HololiveChart group={group} limit={1000} />
    </>
  )
}
