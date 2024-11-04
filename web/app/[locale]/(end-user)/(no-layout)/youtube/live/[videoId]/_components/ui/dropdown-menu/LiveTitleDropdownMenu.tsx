'use client'

import { EllipsisVertical, Maximize, MessagesSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  useGlobalOpenLiveChat,
  useGlobalTheaterMode
} from '../../../_hooks/youtubeLiveStates'

export function LiveTitleDropdownMenu() {
  const t = useTranslations('Page.youtube.live.id.button')
  const { setTheaterMode } = useGlobalTheaterMode()
  const { isOpenLiveChat, setOpenLiveChat } = useGlobalOpenLiveChat()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOpenLiveChat ? null : (
          <DropdownMenuItem onClick={() => setOpenLiveChat(true)}>
            <MessagesSquare className="mr-2 h-4 w-4" />
            <span>{t('openChat')}</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => setTheaterMode(true)}>
          <Maximize className="mr-2 h-4 w-4" />
          <span>{t('theaterMode')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
