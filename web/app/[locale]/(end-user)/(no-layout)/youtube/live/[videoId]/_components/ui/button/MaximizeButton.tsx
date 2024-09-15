'use client'

import { Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useGlobalFullScreenToggle from '../../../_hooks/useGlobalFullScreenToggle'

export default function MaximizeButton() {
  const { setFullScreen } = useGlobalFullScreenToggle()

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => setFullScreen(true)}
    >
      <Maximize className="mr-2 h-4 w-4" />
      シアターモードで大きく表示する
    </Button>
  )
}
