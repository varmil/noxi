import { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/toaster'
import { ClarityScript } from 'components/script/ClarityScript'
import { ThemeProvider } from 'components/styles/ThemeProvider'
import { routing } from 'config/i18n/routing'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
})

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout(props: Props) {
  const { locale } = await props.params
  const { children } = props

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${notoSansJP.className}`}
      suppressHydrationWarning
    >
      <ClarityScript />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
