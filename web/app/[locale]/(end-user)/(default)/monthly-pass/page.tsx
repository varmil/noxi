import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckoutButton } from './components/CheckoutButton'
import { LegalInformation } from './components/LegalInformation'
import { MonthlyPassFeatures } from './components/MonthlyPassFeatures'
import { TermsOfService } from './components/TermsOfService'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '月額パス - PeakX',
  description:
    'PeakXの月額パスに加入して、広告なしの体験や応援チケットなどの特典をお楽しみください。'
}

export default function MonthlyPassPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            PeakX 月額パス
          </h1>
          <p className="text-xl text-muted-foreground">
            あなたの応援をもっと価値あるものに
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-2 order-2 md:order-1">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">無料プラン</CardTitle>
              <CardDescription>基本機能のみ</CardDescription>
              <div className="text-3xl font-bold">¥0</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>VTuberランキングの閲覧</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>基本的なチャンネル情報の確認</span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 h-5 w-5 text-red-500 shrink-0" />
                  <span className="text-muted-foreground">広告あり</span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 h-5 w-5 text-red-500 shrink-0" />
                  <span className="text-muted-foreground">
                    応援チケットなし
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 h-5 w-5 text-red-500 shrink-0" />
                  <span className="text-muted-foreground">
                    コメント投稿不可
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full pointer-events-none">
                現在のプラン
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-primary relative overflow-hidden order-1 md:order-2">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
              おすすめ
            </div>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">月額パス</CardTitle>
              <CardDescription>
                すべての特典をお楽しみいただけます
              </CardDescription>
              <div className="text-3xl font-bold">
                ¥590
                <span className="text-base font-normal text-muted-foreground">
                  /月
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>VTuberランキングの閲覧</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span>基本的なチャンネル情報の確認</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="font-medium">広告なし</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="font-medium">
                    ログインで毎日10枚の応援チケット
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="font-medium">
                    コメント投稿でVTuberを応援
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>

        <MonthlyPassFeatures />

        <Tabs defaultValue="legal" className="w-full mt-16">
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger value="legal" className="col-span-2">
              特定商取引法に基づく表記
            </TabsTrigger>
            <TabsTrigger value="terms">利用規約</TabsTrigger>
          </TabsList>
          <TabsContent value="legal">
            <LegalInformation />
          </TabsContent>
          <TabsContent value="terms">
            <TermsOfService />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
