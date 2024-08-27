import { PropsWithoutRef } from 'react'
import { GroupChart } from 'features/group/chart/components/GroupChart'

type Props = {}

export async function ChartTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <GroupChart limit={1000} />
    </>
  )
}
