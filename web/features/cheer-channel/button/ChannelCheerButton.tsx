'use client'

import { useState } from 'react'
import { Tickets } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ChannelCheerDialog } from 'features/cheer-channel/button/ChannelCheerDialog'

export function ChannelCheerButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const t = useTranslations('Features.cheerChannel')

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
      >
        <Tickets className="mr-2 h-4 w-4" />
        {t('profile.cheerTicket')}
      </Button>

      <ChannelCheerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
