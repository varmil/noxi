import { Lightbulb } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import AuthModalWithText from 'components/auth/dialog/AuthModalWithText'

export default function SignupBanner({ className }: { className?: string }) {
  return (
    <Alert className={className}>
      <Lightbulb className="size-5 fill-yellow-500" />
      <AlertTitle>オープンβテスト開催中</AlertTitle>
      <AlertDescription>
        <span>推しを広告で支える。登録でチケット120枚</span>
        <AuthModalWithText className="text-foreground" />
      </AlertDescription>
    </Alert>
  )
}
