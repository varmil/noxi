'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CheckoutDialog from 'components/stripe/CheckoutDialog'

export function CheckoutButtonUsingDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="w-full" size="lg" onClick={() => setOpen(true)}>
        月額パスに加入する
      </Button>

      <CheckoutDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
