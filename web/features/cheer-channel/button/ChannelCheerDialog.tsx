'use client'

import { useCallback, useEffect, useState } from 'react'
import { Plus, Minus, Send, Tickets, Loader2, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { consumeCheerTickets } from 'apis/cheer-ticket-usages/consumeCheerTickets'
import { revalidateAfterConsumeCheetTickets } from 'apis/cheer-ticket-usages/revalidateAfterConsumeCheetTickets'
import { CheerTicketSchema } from 'apis/cheer-tickets/cheerTicketSchema'
import { GroupString } from 'config/constants/Group'
import { SuccessEffect } from 'features/cheer-channel/button/SuccessEffect'
import { Gender } from 'types/gender'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  cheerTicket?: CheerTicketSchema
  channelId: string
  channelTitle: string
  group: GroupString
  gender: Gender
}

export function ChannelCheerDialog({
  open,
  onOpenChange,
  cheerTicket,
  channelId,
  channelTitle,
  group,
  gender
}: Props) {
  const maxTickets = cheerTicket?.totalCount ?? 0 // 所持チケット数
  const defaultTicketCount = Math.ceil(maxTickets / 2) // 初期値

  const feat = useTranslations('Features.cheerChannel.dialog')
  const [ticketCount, setTicketCount] = useState(defaultTicketCount)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessEffect, setShowSuccessEffect] = useState(false)
  const isSubmittable =
    ticketCount > 0 &&
    ticketCount <= maxTickets &&
    !isSubmitting &&
    !showSuccessEffect

  // ダイアログの開閉に応じた初期化処理
  // アニメーションの最中は再レンダリングを防ぐために何もしない
  useEffect(() => {
    if (!showSuccessEffect) {
      if (open) {
        setTicketCount(defaultTicketCount)
      }
    }
  }, [showSuccessEffect, defaultTicketCount, open])

  const handleTicketChange = (value: number[]) => {
    setTicketCount(value[0])
  }
  const increaseCount = () => {
    if (ticketCount < maxTickets) {
      setTicketCount(ticketCount + 1)
    }
  }
  const decreaseCount = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1)
    }
  }
  const handleConsume = useCallback(async () => {
    setIsSubmitting(true)

    try {
      await consumeCheerTickets({
        channelId,
        group,
        gender,
        usedCount: ticketCount,
        usedAt: new Date()
      })

      setShowSuccessEffect(true)
      setIsSubmitting(false)
      toast.success(feat('success.title'), {
        description: feat('success.description')
      })

      // 成功エフェクトを表示した後にダイアログを閉じる
      setTimeout(() => {
        setShowSuccessEffect(false)
        onOpenChange(false)
      }, 2500)

      // 一番最後にリロードする
      setTimeout(async () => {
        await revalidateAfterConsumeCheetTickets()
      }, 3000)
    } catch (error) {
      setIsSubmitting(false)
      toast.error(feat('error.title'), {
        description: feat('error.description')
      })
    }
  }, [channelId, group, gender, ticketCount, feat, onOpenChange])

  return (
    <>
      {showSuccessEffect && <SuccessEffect ticketCount={ticketCount} />}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg sm:text-xl">
              <Tickets className="mr-2 size-5 text-pink-700 dark:text-pink-500" />
              <span className="flex-1 text-left">
                {feat('title', { channel: channelTitle })}
              </span>
            </DialogTitle>
            <DialogDescription>
              {feat('description', { channel: channelTitle })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseCount}
                  disabled={ticketCount <= 1}
                  className="size-10 rounded-full touch-none"
                >
                  <Minus className="size-4" />
                </Button>

                <div className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950">
                  <div className="absolute inset-0.5 rounded-full bg-card"></div>
                  <div className="relative z-10 text-center">
                    <span className="text-3xl font-bold text-pink-500">
                      {ticketCount}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {feat('tickets')}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseCount}
                  disabled={ticketCount >= maxTickets}
                  className="size-10 rounded-full touch-none"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              <div className="w-full max-w-xs">
                <Slider
                  disabled={maxTickets === 0}
                  value={[ticketCount]}
                  min={1}
                  max={maxTickets}
                  step={1}
                  onValueChange={handleTicketChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {feat('consumeCount', { count: Math.min(1, maxTickets) })}
                  </span>
                  <span>{feat('consumeCount', { count: maxTickets })}</span>
                </div>
              </div>
            </div>

            {maxTickets === 0 && !showSuccessEffect ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{feat('noTickets.title')}</AlertTitle>
                <AlertDescription>
                  {feat('noTickets.description')}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="rounded-lg bg-muted p-4 text-sm">
                <div className="mb-2 flex justify-between">
                  <span>{feat('currentTickets')}</span>
                  <span className="font-bold">
                    {feat('consumeCount', { count: maxTickets })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{feat('remainingTickets')}</span>
                  <span
                    className={cn(
                      'font-bold',
                      maxTickets - ticketCount < 1
                        ? 'text-orange-700 dark:text-orange-500'
                        : ''
                    )}
                  >
                    {feat('consumeCount', {
                      count: Math.max(0, maxTickets - ticketCount)
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              disabled={isSubmitting || showSuccessEffect}
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {feat('cancel')}
            </Button>
            <Button
              disabled={!isSubmittable}
              onClick={handleConsume}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {feat('submitting')}
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 size-4" />
                  {feat('consume')}
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
