'use client'

import { LogIn } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SignIn() {
  const comp = useTranslations('Components')
  return (
    <div className="flex items-center cursor-pointer">
      <LogIn className="mr-2 h-4 w-4" />
      <span>{comp('auth.signIn')}</span>
    </div>
  )
}
