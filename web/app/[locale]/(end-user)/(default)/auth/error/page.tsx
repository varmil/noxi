import { use } from 'react'
import { Locale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
        <Card className="min-w-[330px]">
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold">{page('title')}</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 max-w-md">
              <p>{errorMessage}</p>
              <p>
                code: <code>{error}</code>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/auth/signin">{page('backToSignIn')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Page>
  )
}
