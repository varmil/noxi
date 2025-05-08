import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import AuthForm from '../form/AuthForm'

export function AuthCard() {
  const comp = useTranslations('Components.auth')

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {comp('getStarted')}
        </CardTitle>
        <CardDescription className="text-center">
          {comp('selectMethod')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  )
}
