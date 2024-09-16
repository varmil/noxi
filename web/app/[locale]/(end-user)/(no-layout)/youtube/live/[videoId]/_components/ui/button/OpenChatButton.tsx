'use client'

import { Button } from '@/components/ui/button'
import { useGlobalOpenLiveChat } from '../../../_hooks/youtubeLiveStates'

/** すでに表示している場合は何も表示しない */
export default function OpenChatButton() {
  const { isOpenLiveChat, setOpenLiveChat } = useGlobalOpenLiveChat()

  if (isOpenLiveChat) {
    return null
  }

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
