'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useGlobalOpenLiveChat } from '../../../_hooks/youtubeLiveStates'

/** すでに表示している場合は何も表示しない */
export default function OpenChatButton({ className }: { className?: string }) {
  const t = useTranslations('Page.youtube.live.button')
  const { isOpenLiveChat, setOpenLiveChat } = useGlobalOpenLiveChat()

  if (isOpenLiveChat) {
    return null
  }

  return (
    <Button
      variant="ghost"
      className={`w-full ${className ?? ''}`}
      onClick={() => setOpenLiveChat(true)}
    >
      {t('openChat')}
    </Button>
  )
}
