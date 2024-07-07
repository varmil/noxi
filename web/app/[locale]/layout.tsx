import { Toaster } from '@/components/ui/toaster'
import { GoogleTagManager } from '@next/third-parties/google'
import Site from 'config/constants/Site'
import { locales } from 'config/i18n/locale'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: `${Site.TITLE}`,
  description:
    'This example shows how to use Next.js along with Google Analytics.'
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <body>
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
