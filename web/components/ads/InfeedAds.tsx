'use client'

import { useEffect } from 'react'
import { usePathname } from 'lib/navigation'

/** @note WIP */
const InfeedAds = () => {
  const pathname = usePathname()

  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (e) {
      console.error(e)
    }
  }, [pathname])

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-adtest={process.env.ENV_NAME !== 'production' ? 'on' : 'off'}
        data-ad-format="fluid"
        data-ad-layout-key="-g9+3r+6o-9u-40"
        data-ad-client="ca-pub-4929947179869258"
        data-ad-slot="2452464982"
      />
    </div>
  )
}

export default InfeedAds
