'use client'

import { EllipsisVertical, MessagesSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGlobalOpenLiveChat } from '../../../_hooks/youtubeLiveStates'

export function LiveTitleDropdownMenu() {
  const t = useTranslations('Page.youtube.live.id.button')
  const { isOpenLiveChat, setOpenLiveChat } = useGlobalOpenLiveChat()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('label')}>
          <EllipsisVertical className="size-5 sm:size-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOpenLiveChat ? null : (
          <DropdownMenuItem onClick={() => setOpenLiveChat(true)}>
            <MessagesSquare className="mr-2 h-4 w-4" />
            <span>{t('openChat')}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
