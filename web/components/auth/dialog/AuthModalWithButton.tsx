'use client'

import type React from 'react'
import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import AuthModal from 'components/auth/dialog/AuthModal'

type Props = {
  disabled?: boolean
}

export default function AuthModalWithButton({ disabled }: Props) {
  const comp = useTranslations('Components.auth')
  const [open, setOpen] = useState(false)
  return (
    <AuthModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <DialogTrigger asChild>
          <Button variant="default" disabled={disabled}>
            <LogIn className="mr-2 size-4" />
            <span>{comp('buttonText')}</span>
          </Button>
        </DialogTrigger>
      }
    />
  )
}
