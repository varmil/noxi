'use client'

import { useCallback, useEffect, useState } from 'react'
import { Tickets } from 'lucide-react'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { recordProgress } from 'apis/hyper-chat-tickets/recordProgress'
import { ProgressResponseSchema } from 'apis/hyper-chat-tickets/ticketSchema'

export function HyperChatTicketProgress({
  session
}: {
  session: Session | null
}) {
  const t = useTranslations('Components.hyperChatTicketProgress')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progressData, setProgressData] =
    useState<ProgressResponseSchema | null>(null)

  const checkProgress = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!session?.user?.id) {
        return
      }
      const result = await recordProgress()
      setProgressData(result)

      // 進捗が記録されたらダイアログを表示
      setOpen(true)
    } catch (error) {
      console.error('Error recording HyperChat ticket progress:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    if (session?.user) {
      checkProgress()
    }
  }, [checkProgress, session])

  const handleClose = () => {
    setOpen(false)
    if (progressData?.granted) {
      toast(t('toastTitle'), {
        description: t('toastDescription')
      })
    }
  }

  if (!session?.user || isLoading || !progressData) {
    return null
  }

  const isGranted = progressData.granted

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isGranted ? t('description') : t('progressDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 min-h-[110px] justify-center">
          {isGranted && (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="relative size-32 bg-accent rounded-full flex items-center justify-center">
                <Tickets className="size-16 text-accent-foreground" />
                <div className="absolute -top-2 -right-2 bg-accent-foreground text-accent text-lg font-bold rounded-full size-10 flex items-center justify-center">
                  +1
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">{t('awarded')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('useInstructions')}
                </p>
              </div>
            </div>
          )}

          {/* 進捗バー */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{t('progress')}</span>
              <span>{progressData.currentCount}/3</span>
            </div>
            <Progress
              value={(progressData.currentCount / 3) * 100}
              className="h-2"
            />
            <p className="text-xs text-center text-muted-foreground">
              {t('nextTicket', { days: 3 - progressData.currentCount })}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
