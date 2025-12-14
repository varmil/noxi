import { use } from 'react'
import { AlertCircle } from 'lucide-react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AuthCard } from 'components/auth/card/AuthCard'
import { Page } from 'components/page'
import { routing } from 'config/i18n/routing'
import { Link } from 'lib/navigation'
import { getOgUrl } from 'utils/og-url'
import { getWebUrl } from 'utils/web-url'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ error: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Page.auth.signin' })
  ])

  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: `${page('metadata.description')}`,
    alternates: { canonical: `${getWebUrl()}/${locale}/auth/signin` }
  }
}

export default function SignIn(props: Props) {
  const searchParams = use(props.searchParams)
  const error = searchParams.error
  const page = useTranslations('Page.auth.signin.error')
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case null:
        return null
      case 'OAuthSignin':
        return page('oAuthSignin')
      case 'OAuthCallback':
        return page('oAuthCallback')
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
        return page('oAuthCreateAccount')
      case 'Callback':
        return page('callback')
      case 'OAuthAccountNotLinked':
        return page('oAuthAccountNotLinked')
      case 'EmailSignin':
      case 'CredentialsSignin':
        return page('emailSignin')
      case 'AccessDenied':
        return page('accessDenied')
      case 'Configuration':
      case 'Default':
        return page('default')
      default:
        return `Error: ${errorCode}`
    }
  }

  return (
    <Page>
      <div className="flex min-h-[78vh] sm:min-h-[80vh] flex-col items-center justify-center gap-4">
        {error && (
          <Alert className="w-full max-w-md mx-auto" variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>{page('title')}</AlertTitle>
            <AlertDescription>
              <div>
                <span>{getErrorMessage(error)}</span>
                <code className="block">code: {error}</code>
              </div>
              <div>
                {page.rich('message', {
                  contact: children => (
                    <Link className="underline" href="/contact">
                      {children}
                    </Link>
                  )
                })}
              </div>
            </AlertDescription>
          </Alert>
        )}
        <AuthCard />
      </div>
    </Page>
  )
}
