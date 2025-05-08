'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import AppleIcon from 'components/auth/icon/AppleIcon'
import GoogleIcon from 'components/auth/icon/GoogleIcon'
import { Link } from 'lib/navigation'

interface AuthFormProps {
  redirectTo?: string
}

export default function AuthForm({ redirectTo }: AuthFormProps) {
  const comp = useTranslations('Components.auth')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { redirectTo })
    } catch (error) {
      console.error(error)
      toast.error('エラーが発生しました', {
        description: 'ログインに失敗しました。もう一度お試しください。'
      })
      setIsLoading(false)
    }
  }

  const handleAppleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('apple', { redirectTo })
    } catch (error) {
      toast.error('エラーが発生しました', {
        description: 'ログインに失敗しました。もう一度お試しください。'
      })
      setIsLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      await signIn('resend', { email })
      toast.success('メールを送信しました', {
        description: 'ログインリンクをメールで確認してください。'
      })
    } catch (error) {
      console.error(error)
      toast.error('エラーが発生しました', {
        description: 'メール送信に失敗しました。もう一度お試しください。'
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-4 h-12 px-4 border-2"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <GoogleIcon className="size-6" />
        <span className="text-left w-[160px]">Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-4 h-12 px-4 border-2"
        onClick={handleAppleSignIn}
        disabled={isLoading}
      >
        <AppleIcon className="size-6 dark:fill-white" />
        <span className="text-left w-[160px]">Continue with Apple</span>
      </Button>
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-muted-foreground text-sm">
            {comp('or')}
          </span>
        </div>
      </div>
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{comp('email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          variant={'outline'}
          className="w-full h-10"
          disabled={isLoading}
        >
          {comp('magicLink')}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>
          {comp.rich('terms', {
            terms: node => (
              <Link
                href="/terms-of-use-and-privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                {node}
              </Link>
            ),
            pp: node => (
              <Link
                href="/terms-of-use-and-privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                {node}
              </Link>
            )
          })}
        </p>
      </div>
    </div>
  )
}
