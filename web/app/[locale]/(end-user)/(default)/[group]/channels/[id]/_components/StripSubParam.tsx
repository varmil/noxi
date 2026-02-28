'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'lib/navigation'

/** ブラウザアクセス時に ?sub= クエリストリングを除去する */
export default function StripSubParam() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('sub')) {
      router.replace(pathname)
    }
  }, [router, pathname])

  return null
}
