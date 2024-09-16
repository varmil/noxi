'use client'

import { Button } from '@/components/ui/button'
import { useGlobalOpenLiveChat } from '../../../_hooks/youtubeLiveStates'

export default function OpenChatButton() {
  const { setOpenLiveChat } = useGlobalOpenLiveChat()

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => setOpenLiveChat(true)}
    >
      チャットを表示
    </Button>
  )
}
