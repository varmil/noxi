'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'lib/navigation'

const DisplaySquareAds = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (e) {
      console.error(e)
    }
  }, [pathname, searchParams])

  return (
    <div className="text-center" key={pathname + searchParams.toString()}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-adtest={process.env.ENV_NAME !== 'production' ? 'on' : 'off'}
        data-ad-client="ca-pub-4929947179869258"
        data-ad-slot="4056949447"
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
    </div>
  )
}

export default DisplaySquareAds
