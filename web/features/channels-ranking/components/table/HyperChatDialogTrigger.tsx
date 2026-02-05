'use client'

import { useState } from 'react'
import { MessagesSquare } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import AuthModal from 'components/auth/dialog/AuthModal'
import { HyperChatDialog } from 'components/hyper-chat/post/HyperChatDialog'

type Props = {
  channelId: string
  channelTitle: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
}

export function HyperChatDialogTrigger({
  channelId,
  channelTitle,
  group,
  gender
}: Props) {
  const { data: session } = useSession()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleClick = () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }
    setDialogOpen(true)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={handleClick}
      >
        <MessagesSquare className="size-4" />
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
