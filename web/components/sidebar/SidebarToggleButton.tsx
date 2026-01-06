'use client'

import { PanelLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from 'components/sidebar/SidebarContext'

export function SidebarToggleButton() {
  const { toggle } = useSidebar()

  return (
    <Button
      size="icon"
      variant="ghost"
      className="hidden lg:flex lg:relative lg:top-px"
      onClick={toggle}
    >
      <PanelLeftIcon className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
