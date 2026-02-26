'use client'

import { useState } from 'react'
import { EllipsisVertical, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { HyperChatDeleteDialog } from './HyperChatDeleteDialog'

interface Props {
  hyperChatId: number
  channelId: string
  className?: string
}

export function HyperChatCardMenu({
  hyperChatId,
  channelId,
  className
}: Props) {
  const t = useTranslations('Features.hyperChat.delete')
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 sm:size-7 shrink-0 -mr-2"
          >
            <EllipsisVertical className="size-3 sm:size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <Trash2 className="size-4 mr-2" />
            {t('menuLabel')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <HyperChatDeleteDialog
        hyperChatId={hyperChatId}
        channelId={channelId}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
