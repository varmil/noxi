import { use } from 'react'
import { Locale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Page } from 'components/page'
import { Link } from 'lib/navigation'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ error: string }>
}

export default function ErrorPage({ searchParams }: Props) {
  const page = useTranslations('Page.auth.error')
  const error = use(searchParams).error

  let errorMessage = ''
  if (error === 'Configuration') {
    errorMessage = page('configuration')
  } else if (error === 'AccessDenied') {
    errorMessage = page('accessDenied')
  } else if (error === 'Verification') {
    errorMessage = page('verification')
  } else {
    errorMessage = page('default')
  }

  return (
    <Page>
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">{page('title')}</h1>
        <div className="flex flex-col gap-2 text-center max-w-md mb-6">
          <p>{errorMessage}</p>
          <p>
            code: <code>{error}</code>
          </p>
        </div>
        <Button asChild>
          <Link href="/auth/signin">{page('backToSignIn')}</Link>
        </Button>
      </div>
    </Page>
  )
}
