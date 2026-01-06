'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useSidebar } from 'components/sidebar/SidebarContext'

type Props = {
  children: ReactNode
  className?: string
}

export function AsideWrapper({ children, className }: Props) {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 hidden lg:flex w-[280px] flex-col bg-accent/50 z-10',
        'transition-transform duration-300 ease-in-out',
        !isOpen && '-translate-x-full',
        className
      )}
    >
      {children}
    </aside>
  )
}
