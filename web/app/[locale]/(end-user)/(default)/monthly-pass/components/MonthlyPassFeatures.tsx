import { BadgeCheck, MessageSquare, Tickets } from 'lucide-react'

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
            認証バッジを獲得できます。認証バッジを表示することで信頼性を高め、VTuberの応援に熱心であることが伝わります。
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <Tickets className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">応援チケット</h3>
          <p className="text-muted-foreground">
            ログインで毎日追加の応援チケットを獲得できます。より多くの応援チケットの使用が可能になり効果的にランキング上位を狙えます。
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <MessageSquare className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">コメント</h3>
          <p className="text-muted-foreground">
            VTuberページにコメント可能になります。運営から優良コメントとして選ばれると、より目立つ位置にあなたが表示されます。
          </p>
        </div>
      </div>
    </div>
  )
}
