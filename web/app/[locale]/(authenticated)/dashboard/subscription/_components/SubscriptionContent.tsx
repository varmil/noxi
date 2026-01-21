'use client'

import { useState } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function SubscriptionContent() {
  const [isLoading, setIsLoading] = useState(false)

  // サブスクリプション情報のモックデータ - ステータスのみ保持
  const subscription = {
    status: 'active' // "active" または "inactive"
  }

  const handleGoToStripePortal = async () => {
    setIsLoading(true)

    // 実際の実装ではここでStripeカスタマーポータルのセッションを作成するAPIを呼び出す
    await new Promise(resolve => setTimeout(resolve, 500))

    // Stripeカスタマーポータルへリダイレクト
    window.open(
      'https://billing.stripe.com/p/login/test_fZu4gr2PM8PE8Te30faEE00',
      '_blank'
    )

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>サブスクリプション管理</CardTitle>
            <Badge
              variant={
                subscription.status === 'active' ? 'default' : 'destructive'
              }
            >
              {subscription.status === 'active' ? '有効' : '無効'}
            </Badge>
          </div>
          <CardDescription>
            サブスクリプションの管理はStripeカスタマーポータルで行えます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTitle>サブスクリプション管理について</AlertTitle>
            <AlertDescription>
              支払い方法の更新、請求履歴の確認、サブスクリプションの解約などはStripeカスタマーポータルから行えます。
              下のボタンをクリックして、Stripeカスタマーポータルにアクセスしてください。
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGoToStripePortal}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                読み込み中...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Stripeカスタマーポータルへ移動
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
