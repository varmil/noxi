'use client'

import { useState } from 'react'
import { Ticket, Plus, Minus, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChannelCheerDialog({ open, onOpenChange }: Props) {
  const [ticketCount, setTicketCount] = useState(1)
  const [message, setMessage] = useState('')
  const maxTickets = 10 // 所持チケット数
  const feat = useTranslations('Features.cheerChannel.dialog')

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

  const handleConsume = () => {
    // 応援処理を実行
    console.log(`${ticketCount}枚のチケットで応援しました: ${message}`)
    onOpenChange(false)
    setTicketCount(1)
    setMessage('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Ticket className="mr-2 h-5 w-5 text-pink-500" />
            {/* TODO: channel */}
            {feat('title', { channel: '天音かなた' })}
          </DialogTitle>
          <DialogDescription>
            {/* TODO: channel */}
            {feat('description', { channel: '天音かなた' })}
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
                className="h-10 w-10 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950">
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
                className="h-10 w-10 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="w-full max-w-xs">
              <Slider
                value={[ticketCount]}
                min={1}
                max={maxTickets}
                step={1}
                onValueChange={handleTicketChange}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 {feat('tickets')}</span>
                <span>
                  {maxTickets} {feat('tickets')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{feat('messageLabel')}</Label>
            <Textarea
              id="message"
              placeholder={feat('messagePlaceholder')}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm">
            <div className="mb-2 flex justify-between">
              <span>{feat('currentTickets')}</span>
              <span className="font-bold">{maxTickets}枚</span>
            </div>
            <div className="flex justify-between">
              <span>{feat('remainingTickets')}</span>
              <span
                className={cn(
                  'font-bold',
                  maxTickets - ticketCount < 3 ? 'text-orange-500' : ''
                )}
              >
                {maxTickets - ticketCount}枚
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {feat('cancel')}
          </Button>
          <Button
            onClick={handleConsume}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
          >
            <Send className="mr-2 h-4 w-4" />
            {feat('consume')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
