'use client'

import { PropsWithChildren, useRef } from 'react'
import useGlobalTheaterMode from '../../_hooks/useGlobalTheaterMode'

type Props = {
  DefaultLayout: React.ReactNode
  TheaterLayout: React.ReactNode
}

export default function LayoutFactory({
  DefaultLayout,
  TheaterLayout
}: PropsWithChildren<Props>) {
  const ref = useRef(null)
  const { isTheaterMode } = useGlobalTheaterMode()

  if (isTheaterMode) {
    return <section ref={ref}>{TheaterLayout}</section>
  }

  return DefaultLayout
}
