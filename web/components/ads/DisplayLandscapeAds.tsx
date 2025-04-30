'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'lib/navigation'

const SLOT = '1985028297'

const DisplayLandscapeAds = ({ className }: { className?: string }) => {
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
    <div
      className={`text-center w-full max-w-[728px] ${className || ''}`}
      key={pathname + searchParams.toString()}
    >
      <ins
        className="adsbygoogle h-[100px] md:h-[90px]"
        style={{ display: 'inline-block', width: '100%' }}
        data-adtest={process.env.ENV_NAME !== 'production' ? 'on' : 'off'}
        data-ad-client="ca-pub-4929947179869258"
        data-ad-slot={SLOT}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default DisplayLandscapeAds
