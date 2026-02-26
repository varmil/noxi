'use client'

import type React from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import AuthForm from 'components/auth/form/AuthForm'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
  redirectTo?: string
}

export default function AuthModal({ open, onOpenChange, trigger, redirectTo }: Props) {
  const comp = useTranslations('Components.auth')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {comp('getStarted')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {comp('selectMethod')}
            <br />
            {comp('noExtraInput')}
          </DialogDescription>
        </DialogHeader>
        <AuthForm redirectTo={redirectTo} />
      </DialogContent>
    </Dialog>
  )
}
