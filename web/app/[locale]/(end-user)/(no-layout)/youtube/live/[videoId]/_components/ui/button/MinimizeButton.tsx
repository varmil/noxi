'use client'

import { Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useGlobalTheaterMode from '../../../_hooks/useGlobalTheaterMode'

export default function MinimizeButton() {
  const { setTheaterMode } = useGlobalTheaterMode()

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheaterMode(false)}>
      <Minimize className="h-6 w-6" />
    </Button>
  )
}
