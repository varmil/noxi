'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'JP' | 'EN'>('JP')

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <Button
        variant="ghost"
        className={`h-auto px-1 py-0.5 font-light ${
          currentLang === 'JP'
            ? 'font-semibold border-b-2 border-primary rounded-none'
            : ''
        }`}
        onClick={() => setCurrentLang('JP')}
      >
        JP
      </Button>
      <span className="text-muted-foreground">|</span>
      <Button
        variant="ghost"
        className={`h-auto px-1 py-0.5 font-light ${
          currentLang === 'EN'
            ? 'font-semibold border-b-2 border-primary rounded-none'
            : ''
        }`}
        onClick={() => setCurrentLang('EN')}
      >
        EN
      </Button>
    </div>
  )
}
