'use client'

import { Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useGlobalFullScreenToggle from '../../../_hooks/useGlobalFullScreenToggle'

export default function MinimizeButton() {
  const { setFullScreen } = useGlobalFullScreenToggle()

  return (
    <Button variant="ghost" size="icon" onClick={() => setFullScreen(false)}>
      <Minimize className="h-6 w-6" />
    </Button>
  )
}
