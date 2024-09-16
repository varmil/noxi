'use client'

import { Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGlobalTheaterMode } from '../../../_hooks/youtubeLiveStates'

export default function MaximizeButton() {
  const { setTheaterMode } = useGlobalTheaterMode()

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => setTheaterMode(true)}
    >
      <Maximize className="mr-2 h-4 w-4" />
      シアターモードで大きく表示
    </Button>
  )
}
