import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Page } from 'components/page'
import { Link } from 'lib/navigation'

export default function SuccessPage() {
  return (
    <Page>
      <div className="container mx-auto px-2 py-16 flex items-center justify-center min-h-[70vh]">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">ありがとうございます！</CardTitle>
            <CardDescription>
              PeakX 月額パスへのご加入が完了しました
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p>PeakXのすべての特典をお楽しみください：</p>
            <div className="flex flex-col justify-center items-center">
              <ul className="w-[244px] text-sm text-muted-foreground text-nowrap space-y-1 text-left">
                <li>・広告なしの体験</li>
                <li>・ログインで毎日10枚の応援チケット</li>
                <li>・VTuberへの応援コメント投稿</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">ホームに戻る</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Page>
  )
}
