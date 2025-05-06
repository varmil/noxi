'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { getStripe } from 'utils/stripe'

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

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Stripeチェックアウトページにリダイレクト
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripeが初期化できません')
      }
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId
      })
      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      console.error('チェックアウトエラー:', error)
      toast.error('エラーが発生しました', {
        description:
          'チェックアウトの処理中にエラーが発生しました。もう一度お試しください。'
      })
    } finally {
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
