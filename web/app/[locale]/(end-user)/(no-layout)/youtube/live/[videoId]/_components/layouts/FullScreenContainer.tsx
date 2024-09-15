'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'
import { useFullscreen } from 'react-use'
import useGlobalFullScreenToggle from '../../_hooks/useGlobalFullScreenToggle'

type Props = {
  DefaultLayout: React.ReactNode
  TheaterLayout: React.ReactNode
}
/**
 * Requestに応じて...
 * XS (smartphone) でのみFull Screen
 * SM (tablet) 以上では何もしない
 */
export default function FullScreenContainer({
  DefaultLayout,
  TheaterLayout
}: PropsWithChildren<Props>) {
  const ref = useRef(null)
  const { isFullScreen, setFullScreen } = useGlobalFullScreenToggle()

  useFullscreen(ref, isFullScreen, {
    onClose: () => setFullScreen(false)
  })

  // useEffect, and lock screen orientation when isFullScreen
  useEffect(() => {
    if (isFullScreen) {
      screen.orientation.lock('landscape')
    }
  }, [isFullScreen])

  if (isFullScreen) {
    return <section ref={ref}>{TheaterLayout}</section>
  }

  return DefaultLayout
}
