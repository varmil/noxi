'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGlobalOpenLiveChat } from '../../../_hooks/youtubeLiveStates'

export default function CloseChatButton({ className }: { className?: string }) {
  const { setOpenLiveChat } = useGlobalOpenLiveChat()

  return (
    <Button
      // variant=""
      size={'icon'}
      className={`${className ?? ''}`}
      onClick={() => setOpenLiveChat(false)}
    >
      <X className="h-4 w-4" />
    </Button>
  )
}
