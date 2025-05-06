import { MessageSquare, ShieldCheck, Tickets } from 'lucide-react'

export function MonthlyPassFeatures() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">月額パスの特典</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <ShieldCheck className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">広告なし</h3>
          <p className="text-muted-foreground">
            広告のない、クリーンな閲覧をお楽しみいただけます。コンテンツに集中できる環境で、お気に入りのVTuberを応援しましょう。
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 dark:bg-muted p-3 rounded-full mb-4">
            <Tickets className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">応援チケット</h3>
          <p className="text-muted-foreground">
            ログインで毎日応援チケットを獲得できます。推しに贈ろう！贈られた枚数でランキングが決まります。年間シーズン制で開催中！
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
