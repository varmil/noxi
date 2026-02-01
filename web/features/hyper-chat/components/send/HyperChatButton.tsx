'use client'

import { useState } from 'react'
import { MessagesSquare } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import AuthModal from 'components/auth/dialog/AuthModal'
import { HyperChatDialog } from './HyperChatDialog'

type Props = {
  channelId: string
  channelTitle: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
}

export function HyperChatButton({
  channelId,
  channelTitle,
  group,
  gender
}: Props) {
  const { data: session } = useSession()
  const t = useTranslations('Features.hyperChat')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleButtonClick = () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }
    setDialogOpen(true)
  }

  return (
    <>
      <Button
        // transition-none is for Safari workaround
        className="w-full bg-linear-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-none"
        onClick={handleButtonClick}
      >
        <MessagesSquare className="size-4 mr-1" />
        {t('button.label')}
      </Button>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

      <HyperChatDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        channelId={channelId}
        channelTitle={channelTitle}
        group={group}
        gender={gender}
      />
    </>
  )
}
