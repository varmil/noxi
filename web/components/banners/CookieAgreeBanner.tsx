'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from 'lib/navigation'

const KEY_NAME = 'global/cookie/agreement'

/**
 * @deprecated 特に必要ないので削除予定
 */
export function CookieAgreeBanner({ className }: { className?: string }) {
  const [shouldBeHidden, setValue] = useState<boolean | null | undefined>()
  useEffect(() => {
    const bool = localStorage.getItem(KEY_NAME)
    if (bool === 'true') {
      setValue(true)
    } else {
      setValue(false)
    }
  }, [shouldBeHidden])

  if (shouldBeHidden !== false) return <></>

  return (
    <>
      <Card
        className={`fixed bottom-0 right-0 max-w-[580px] gap-2 rounded-none sm:bottom-2 sm:right-2 ${
          className ?? ''
        }`}
      >
        <div className="grid w-full max-w-md items-center justify-between gap-4 rounded-lg bg-background p-6 shadow-lg animate-in slide-in-from-bottom-100ms">
          <div className="grid gap-2">
            <div className="text-lg font-medium">We value your privacy</div>
            <div className="text-sm text-muted-foreground">
              This site uses cookies to ensure we give you the best experience
              on our website. By continuing to use our website, you agree to our{' '}
              <Link
                href="/terms-of-use-and-privacy-policy"
                className="hover:underline"
                prefetch={false}
              >
                Privacy Policy
              </Link>
              .
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.setItem(KEY_NAME, 'true')
                setValue(true)
              }}
            >
              I Agree
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
