import { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Noto_Sans_JP } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'components/styles/ThemeProvider'
import { locales } from 'config/i18n/locale'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
})

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

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
        <SpeedInsights sampleRate={0.5} />
      </body>
    </html>
  )
}
