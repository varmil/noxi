import { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/sonner'
import { ClarityScript } from 'components/script/ClarityScript'
import { ThemeProvider } from 'components/styles/ThemeProvider'
import { routing } from 'config/i18n/routing'

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale }>
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
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${notoSansJP.className}`}
      suppressHydrationWarning
    >
      <ClarityScript />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <body className="text-sm sm:text-base" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <NextIntlClientProvider>
            {children}
            <Toaster richColors />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
