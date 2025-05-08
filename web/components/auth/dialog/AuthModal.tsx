'use client'

import type React from 'react'
import { PropsWithChildren, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import AuthForm from 'components/auth/form/AuthForm'

export default function AuthModal({
  trigger,
  defaultOpen
}: PropsWithChildren<{ trigger: React.ReactNode; defaultOpen?: boolean }>) {
  const comp = useTranslations('Components.auth')
  const [open, setOpen] = useState(defaultOpen ?? false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {comp('getStarted')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {comp('selectMethod')}
          </DialogDescription>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  )
}
