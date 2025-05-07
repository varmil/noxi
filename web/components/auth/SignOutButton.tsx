'use client'

import { LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SignOut() {
  const comp = useTranslations('Components')
  return (
    <div className="flex items-center cursor-pointer">
      <LogOut className="mr-2 h-4 w-4" />
      <span>{comp('auth.signOut')}</span>
    </div>
  )
}
