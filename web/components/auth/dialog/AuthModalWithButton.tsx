'use client'

import type React from 'react'
import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import AuthModal from 'components/auth/dialog/AuthModal'

type Props = {
  disabled?: boolean
}

export default function AuthModalWithButton({ disabled }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <AuthModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <DialogTrigger asChild>
          <Button variant="outline" disabled={disabled}>
            <LogIn className="mr-2 size-4" />
            <span>Sign in (up next)</span>
          </Button>
        </DialogTrigger>
      }
    />
  )
}
