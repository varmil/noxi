'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useSidebar } from 'components/sidebar/SidebarContext'

type Props = {
  children: ReactNode
}

export function MainContentWrapper({ children }: Props) {
  const { isOpen } = useSidebar()

  return (
    <section
      className={cn(
        'z-0 relative space-y-6 pb-22.5 md:pb-12',
        'transition-[padding] duration-300 ease-in-out',
        isOpen && 'lg:pl-[260px]'
      )}
    >
      {children}
    </section>
  )
}
