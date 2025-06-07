import {
  Trophy,
  Clock,
  RotateCcw,
  Award,
  AlertTriangle,
  Tickets,
  LogIn
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AuthModalWithText from 'components/auth/dialog/AuthModalWithText'
import ZoomableImage from 'components/image/ZoomableImage'
import { Link } from 'lib/navigation'

export default async function HowToPlayTemplate() {
  const [global, page] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Page.howToPlay')
  ])

  return (
    <div className="container mx-auto px-0 py-8 max-w-6xl">
      {/* ヘッダーセクション */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">遊び方</h1>
        <div className="max-w-3xl mx-auto space-y-4 text-lg">
          <p className="font-bold text-xl">あらゆるファンが推しを応援できる</p>
          <p className="text-muted-foreground">
            忙しい社会人にぴったり。切り抜きやまとめを見るだけになっていませんか。
            <br />
            PeakXは推しを広告で支えることができる新しい推し方を提供します。
          </p>
        </div>
      </div>

      {/* 3ステップセクション */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="text-lg px-6 py-2">
            簡単3ステップ！
          </Badge>
          <h2 className="text-xl md:text-4xl font-bold mt-4 mb-2">
            VTuberファンのためのサービス
          </h2>
        </div>

        {/* ステップ画像 */}
        <div className="mb-12 flex justify-center">
          <ZoomableImage
            src="/how-to-play/how-to-play-steps.png"
            alt="3ステップの説明図"
            width={800}
            height={400}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        {/* ステップ詳細 */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-2xl font-bold px-3 py-1"
                >
                  1
                </Badge>
              </div>
              <CardTitle className="text-xl">
                <Link
                  href="/auth/signin"
                  className="underline underline-offset-2"
                >
                  新規登録する
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                ログインで
                <br />
                毎日応援チケットをGET
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tickets className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-2xl font-bold px-3 py-1"
                >
                  2
                </Badge>
              </div>
              <CardTitle className="text-xl">推しのページへ行く</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                「応援チケットを使う」
                <br />
                ボタンで応援する
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-2xl font-bold px-3 py-1"
                >
                  3
                </Badge>
              </div>
              <CardTitle className="text-xl">上位を目指そう</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                タレント、ファン双方の
                <br />
                注目度が高まる仕組みを提供します
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      {/* ルールセクション */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">ルール</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-lg">Season期間</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Season βは~2025/08/31までを予定
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-green-600" />
                <CardTitle className="text-lg">ランキングリセット</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seasonが終わるとランキングはリセット
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-lg">応援履歴の確認</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                終了したSeasonの応援状況は
                <br />
                タレントページやユーザープロフィールで
                <br />
                確認できるようになります
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <CardTitle className="text-lg">表彰制度</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                上位のタレント、ユーザーは
                <br />
                露出機会が増え広告効果が高まります
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-3 text-muted-foreground">
              <AlertTriangle className="size-6" />
              <CardTitle>注意事項</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            応援チケット、その他仕様を含め予告なく変更される場合があります。
          </CardContent>
        </Card>
      </div>

      {/* フッター */}
      <div className="text-center mt-16 pt-8 border-t">
        <p className="text-muted-foreground">
          毎日１分で大丈夫。推しを応援しよう！
        </p>
        <AuthModalWithText className="sm:text-base" />
      </div>
    </div>
  )
}
