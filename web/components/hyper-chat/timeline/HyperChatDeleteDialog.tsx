'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { deleteHyperChat } from 'apis/hyper-chats/deleteHyperChat'

interface Props {
  hyperChatId: number
  channelId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HyperChatDeleteDialog({
  hyperChatId,
  channelId,
  open,
  onOpenChange
}: Props) {
  const t = useTranslations('Features.hyperChat.delete')
  const [confirmText, setConfirmText] = useState('')
  const [isPending, startTransition] = useTransition()

  const isConfirmed = confirmText === 'delete'

  const handleDelete = () => {
    startTransition(async () => {
      await deleteHyperChat(hyperChatId, channelId)
      await new Promise(resolve => setTimeout(resolve, 500))
      onOpenChange(false)
      setConfirmText('')
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={event => {
          event.preventDefault()
          document.body.style.pointerEvents = ''
        }}
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <Input
          placeholder={t('inputPlaceholder')}
          value={confirmText}
          onChange={e => setConfirmText(e.target.value)}
          disabled={isPending}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setConfirmText('')}
            >
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={!isConfirmed || isPending}
            onClick={handleDelete}
          >
            {isPending ? t('deleting') : t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
