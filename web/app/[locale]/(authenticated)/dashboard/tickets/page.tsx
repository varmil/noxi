import { Construction } from 'lucide-react'
import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'チケット - マイページ - VCharts'
  }
}

export default async function TicketsPage() {
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>チケット</CardTitle>
          <CardDescription>
            ハイパーチャットチケットの残数と使用履歴を確認できます
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
    </div>
  )
}
