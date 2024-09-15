'use client'

import { PropsWithChildren } from 'react'
import { useGlobalTheaterMode } from '../../_hooks/theaterHooks'

type Props = {
  DefaultLayout: React.ReactNode
  TheaterLayout: React.ReactNode
}

export default function LayoutFactory({
  DefaultLayout,
  TheaterLayout
}: PropsWithChildren<Props>) {
  const { isTheaterMode } = useGlobalTheaterMode()

  if (isTheaterMode) {
    return <section>{TheaterLayout}</section>
  }

  return DefaultLayout
}
