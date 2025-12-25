import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function DataMethodologyAndDisclaimerJa() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6 mb-44">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            データ算出方法と免責事項
          </h1>
          <p className="mt-2 text-muted-foreground">
            VChartsが提供するデータの算出方法と注意事項について
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>概要・母集団</CardTitle>
            <CardDescription>
              データの範囲と対象について
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              本レポートはVChartsが独自に収集した計測データに基づきます。タレントの絶対的な価値や将来の収益性を保証するものではありません。
            </p>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">集計対象</p>
              <p className="text-lg font-semibold">
                VCharts登録済みタレント 846名
              </p>
              <p className="text-xs text-muted-foreground">2025年12月時点</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>集計定義と仕様</CardTitle>
            <CardDescription>
              各指標の算出方法について
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold">同時接続数（Max CCV）</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>各配信の「最大同時接続数」を採用します</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    レポート内の「中央値」等の指標は、この「各配信の最大値」を元に算出しています
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Bot排除等の補正は行わずAPIの返却値を使用します
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>取得間隔：2分</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">スーパーチャット</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    サーバ負荷軽減のためライブ配信開始から終了までの間に発生したイベントのみを集計します
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    待機所・プレミア公開中の金額は含みません。従って実際の総額より少ない集計となる点にご留意ください
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    コメント流速が極端に大きい場合、API仕様上一部取得漏れが発生する可能性があります
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>取得間隔：5秒</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">母集団の変動について</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                集計期間中にも300名以上のタレントが順次データベースに追加されています。
                特に個人勢カテゴリにおける数値の変動やトレンドには、この「計測対象の増加」が含まれる点にご留意ください。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>免責事項</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              計測ロジックは品質向上のため予告なく調整される場合があります。
              重要な変更はサイトまたはXにて告知します。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
