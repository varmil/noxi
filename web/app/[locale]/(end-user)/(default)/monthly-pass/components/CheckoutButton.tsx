'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      if (!url) {
        throw new Error('チェックアウトURLが取得できません')
      }

      // Stripeチェックアウトページにリダイレクト
      window.location.href = url
    } catch (error) {
      console.error('チェックアウトエラー:', error)
      toast.error('エラーが発生しました', {
        description:
          'チェックアウトの処理中にエラーが発生しました。もう一度お試しください。'
      })
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          処理中...
        </>
      ) : (
        '月額パスに加入する'
      )}
    </Button>
  )
}
