'use client'

import { useCallback, useEffect, useState } from 'react'
import { Gift } from 'lucide-react'
import { Session } from 'next-auth'
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
      toast('応援チケットを獲得しました', {
        description: `現在の所持数: ${bonusData.totalTickets}枚`
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
            デイリーログインボーナス！
          </DialogTitle>
          <DialogDescription className="text-center">
            本日のログイン分として応援チケットを獲得
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
              応援チケット {bonusData?.ticketsAwarded || 0}枚を獲得しました！
            </p>
            <p className="text-sm text-muted-foreground">
              現在の所持数: {bonusData?.totalTickets || 0}枚
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground max-w-xs">
            <p>
              応援チケットをVTuberに使うことで応援ランキングに貢献できます。毎日ログインしてチケットを集め、どんどん使ってみましょう！
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
