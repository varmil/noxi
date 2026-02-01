import { Construction } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { PageSMPX } from 'components/page'

export default async function IndexTemplate() {
  return (
    <section className={`space-y-4 ${PageSMPX}`}>
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>応援ランキング</CardTitle>
          <CardDescription>
            ハイパーチャットによる応援ランキングを表示します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Construction className="size-12 mb-4" />
            <p className="text-lg font-medium">Coming Soon</p>
            <p className="text-sm">ハイパーチャット機能は現在開発中です</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
