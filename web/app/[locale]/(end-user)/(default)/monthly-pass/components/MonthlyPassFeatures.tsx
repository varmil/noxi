import { BadgeCheck, Gift, Tickets } from 'lucide-react'

export function MonthlyPassFeatures() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">月額パスの特典</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <BadgeCheck className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">認証バッジ</h3>
          <p className="text-muted-foreground">
            認証バッジを獲得できます。認証バッジを表示することで信頼性を高め、VTuberの推し活に熱心であることが伝わります。
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <Gift className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">ログインボーナスの強化</h3>
          <p className="text-muted-foreground">
            通常の4枚に加えてさらに6枚の応援チケットを獲得できます。より多くのチケット使用が可能になり効果的にランキング上位を狙えます。
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <Tickets className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            月額パス加入・継続ボーナス
          </h3>
          <p className="text-muted-foreground">
            加入完了で21枚の応援チケットを獲得できます。その後も毎月のサブスクリプションが継続されるたびに21枚の応援チケットを獲得できます。
          </p>
        </div>
      </div>
    </div>
  )
}
