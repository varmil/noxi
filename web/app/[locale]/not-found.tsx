import { Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Header from 'components/header/Header'
import { Link } from 'lib/navigation'

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[85svh] flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Frown className="h-6 w-6" />
              404 Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              お探しのページが見つかりませんでした。お手数ですが「前のページに戻る」操作を行い、復帰いただけると幸いです。
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button asChild>
              <Link href={'/'} prefetch={false}>
                トップページに戻る
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
