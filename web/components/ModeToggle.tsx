'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle({ sizeClassName }: { sizeClassName?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const size = sizeClassName || 'size-[1rem]'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        if (resolvedTheme === 'light') {
          setTheme('dark')
        } else {
          setTheme('light')
        }
      }}
    >
      <Sun
        className={`rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${size}`}
      />
      <Moon
        className={`absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${size}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
