'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Header from 'components/header/Header'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('/[locale]/error.tsx', error)
  }, [error])

  return (
    <>
      <Header />
      <div className="min-h-[85svh] flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Frown className="h-6 w-6" />
              ページが読み込めませんでした
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              何かしらの要因によりページの読み込みに失敗しまったようです。たいへんお手数ですが再試行を行うか、ページ最上部のロゴをクリックして復帰できるかどうかお試しいただけると幸いです。
              <br />
              <br />
              現在、ランダムに発生するエラーを調査しておりこの場合時間を空けて再度アクセスいただくと解消する場合がございます。
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={reset}>再試行</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
