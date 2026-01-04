import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

/** @deprecated */
export function TermsOfService() {
  return (
    <Card>
      <ScrollArea className="h-[300px]">
        <CardContent className="p-6 space-y-4 text-sm">
          <h3 className="text-lg font-medium">月額パス利用規約</h3>

          <div className="space-y-2">
            <h4 className="font-medium">1. サービス内容</h4>
            <p>
              月額パス（以下「本サービス」）は、VCharts（以下「当社」）が提供する有料サブスクリプションサービスです。
              本サービスは、広告非表示やユーザー参加型の限定機能の特典を提供します。
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">2. 特典の利用</h4>
            <p>
              当サービスにおける「応援チケット」は、ユーザーが毎日ログインすることで付与されます。未ログイン日に付与されなかったチケットは翌日に繰越されず、付与権利も失効いたします。あらかじめご了承ください。
              「有料サブスクリプション」で入手した応援チケットの有効期限は付与日から3年間です。チケットその他機能の換金はできません。
              「無料の」ログインボーナスで入手した応援チケットはシーズンごとにリセットされ繰り越せません。
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">3. 変更と終了</h4>
            <p>
              当社は、本サービスの内容、料金、利用規約を変更する権利を有します。
              当社は、事前の通知をもって本サービスを終了する権利を有します。
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">4. 免責事項</h4>
            <p>
              当社は、本サービスの中断、遅延、エラーについて責任を負いません。
              本サービスは「現状有姿」で提供され、特定の目的への適合性を保証するものではありません。
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">5. 返金・交換</h4>
            <p>
              商品の性質上いかなる理由においても、購入後の返金・交換等は受け付けておりません。
              あらかじめご了承ください。
            </p>
          </div>

          <p className="text-muted-foreground mt-4">
            本規約は2025年5月5日に最終更新されました。
          </p>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
