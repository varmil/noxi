'use client'

import { useCallback, useEffect, useState } from 'react'
import { Gift } from 'lucide-react'
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
import { postDailyLoginBonus } from 'apis/youtube/postDailyLoginBonus'
import { DailyLoginBonusSchema } from 'apis/youtube/schema/dailyLoginBonusSchema'

export function DailyLoginBonus({ session }: { session: Session | null }) {
  const comp = useTranslations('Components.loginBonus')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [bonusData, setBonusData] = useState<DailyLoginBonusSchema | null>(null)

  const checkDailyBonus = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!session?.user?.id) {
        return
      }
      const result = await postDailyLoginBonus({
        userId: Number(session.user.id)
      })
      setBonusData(result)

      // ボーナス対象の場合はダイアログを表示
      if (result.eligible) {
        setOpen(true)
      }
    } catch (error) {
      console.error('Error checking daily bonus:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    // ユーザーがログインしている場合のみチェック
    if (session?.user) {
      checkDailyBonus()
    }
  }, [checkDailyBonus, session])

  const handleClose = () => {
    setOpen(false)
    // ダイアログを閉じた後にトーストで通知
    if (bonusData?.eligible) {
      toast(comp('toastTitle'), {
        description: comp('current', {
          count: bonusData.totalTickets
        })
      })
    }
  }

  // ユーザーがログインしていない場合は何も表示しない
  if (!session?.user || isLoading) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {comp('title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            <div>{comp('description')}</div>
            <div>{comp('switch')}</div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <Gift className="h-16 w-16 text-primary" />
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">
              +{bonusData?.ticketsAwarded || 1}
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              {comp('awarded', {
                count: bonusData?.ticketsAwarded || 0
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {comp('current', {
                count: bonusData?.totalTickets || 0
              })}
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground max-w-xs">
            <p>{comp('tips')}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            {comp('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
