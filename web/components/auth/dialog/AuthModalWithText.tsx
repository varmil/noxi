'use client'

import type React from 'react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { DialogTrigger } from '@/components/ui/dialog'
import AuthModal from 'components/auth/dialog/AuthModal'

type Props = {
  className?: string
}

export default function AuthModalWithText({ className }: Props) {
  const comp = useTranslations('Components.auth')
  const [open, setOpen] = useState(false)
  return (
    <AuthModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <DialogTrigger className={className} asChild>
          <span className="inline-block cursor-pointer text-sm underline underline-offset-2 hover:text-muted-foreground">
            {comp('linkText')}
          </span>
        </DialogTrigger>
      }
    />
  )
}
