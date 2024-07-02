import { GoogleTagManager } from '@next/third-parties/google'
import Aside from 'components/Aside'
import Site from 'config/constants/Site'
import { locales } from 'config/locale'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
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
        <Aside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-muted/40">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  )
}
