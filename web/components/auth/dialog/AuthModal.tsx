'use client'

import type React from 'react'
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

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
}

export default function AuthModal({ open, onOpenChange, trigger }: Props) {
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
          </DialogDescription>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  )
}
