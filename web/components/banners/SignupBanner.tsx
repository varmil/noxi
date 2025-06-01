import { Lightbulb } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import AuthModalWithText from 'components/auth/dialog/AuthModalWithText'

export default function SignupBanner({ className }: { className?: string }) {
  return (
    <Alert className={className}>
      <Lightbulb className="size-5 fill-yellow-500" />
      <AlertTitle>新ランキングのオープンβテスト開催中</AlertTitle>
      <AlertDescription>
        <span>
          毎日１分でしっかり推しを応援できます。新規登録で応援チケット120枚獲得。
        </span>
        <AuthModalWithText className="text-foreground" />
      </AlertDescription>
    </Alert>
  )
}
