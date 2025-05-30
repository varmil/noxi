'use client'

import { useState } from 'react'
import { Tickets } from 'lucide-react'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CheerTicketSchema } from 'apis/cheer-tickets/cheerTicketSchema'
import AuthModal from 'components/auth/dialog/AuthModal'
import { GroupString } from 'config/constants/Group'
import { ChannelCheerDialog } from 'features/cheer-channel/button/ChannelCheerDialog'
import { Gender } from 'types/gender'

export function ChannelCheerButton({
  session,
  cheerTicket,
  channelId,
  channelTitle,
  group,
  gender,
  disabled
}: {
  session: Session | null
  cheerTicket?: CheerTicketSchema
  channelId: string
  channelTitle: string
  group: GroupString
  gender: Gender
  disabled?: boolean
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const t = useTranslations('Features.cheerChannel')

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        // transition-none is for Safari workaround
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-none"
        disabled={disabled}
      >
        <Tickets className="mr-2 h-4 w-4" />
        {t('profile.cheerTicket')}
      </Button>

      {session ? (
        <ChannelCheerDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          cheerTicket={cheerTicket}
          channelId={channelId}
          channelTitle={channelTitle}
          group={group}
          gender={gender}
        />
      ) : (
        <AuthModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      )}
    </>
  )
}
