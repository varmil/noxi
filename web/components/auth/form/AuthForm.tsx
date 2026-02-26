'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GoogleIcon from 'components/auth/icon/GoogleIcon'
import { Link } from 'lib/navigation'

interface AuthFormProps {
  redirectTo?: string
}

export default function AuthForm({ redirectTo }: AuthFormProps) {
  const comp = useTranslations('Components.auth')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false)

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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      await signIn('resend', { email, redirectTo })
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

  const handleTestSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('password', { password: 'password' })
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col py-4">
      {process.env.NODE_ENV === 'development' && (
        <Button
          variant="outline"
          className="flex items-center justify-center gap-4 h-12 px-4 border-2 mb-4 border-dashed border-yellow-500 text-yellow-600"
          onClick={handleTestSignIn}
          disabled={isLoading}
        >
          {comp('testLogin')}
        </Button>
      )}

      <Button
        variant="outline"
        className="flex items-center justify-center gap-4 h-12 px-4 border-2"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <GoogleIcon className="size-6" />
        <span className="text-left w-[160px]">Continue with Google</span>
      </Button>

      <Collapsible
        className="mt-8"
        open={isEmailFormOpen}
        onOpenChange={setIsEmailFormOpen}
      >
        <CollapsibleTrigger className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
          <span>{comp('noGoogleAccount')}</span>
          <ChevronDown
            className={`ml-1 size-4 transition-transform ${isEmailFormOpen ? 'rotate-180' : ''}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="email">
                {comp('email')}
              </Label>
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
        </CollapsibleContent>
      </Collapsible>

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
