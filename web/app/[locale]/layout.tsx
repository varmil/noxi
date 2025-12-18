import { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Noto_Sans_JP } from 'next/font/google'
import { notFound } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/sonner'
import { SessionKeepAlive } from 'components/auth/session/SessionKeepAlive'
import { DailyLoginBonus } from 'components/login-bonus/DailyLoginBonus'
import { PWAInstallProvider } from 'components/pwa/PWAInstallContext'
import { AdsByGoogleScript } from 'components/script/AdsByGoogleScript'
import { ClarityScript } from 'components/script/ClarityScript'
import { ThemeProvider } from 'components/styles/ThemeProvider'
import { routing } from 'config/i18n/routing'
import { auth } from 'lib/auth'
import type { Viewport } from 'next'

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

/** for PWA. see https://web.dev/articles/add-manifest?hl=ja */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0b09' }
  ]
}

export default async function LocaleLayout(props: Props) {
  const [{ locale }, session] = await Promise.all([props.params, auth()])
  const { children } = props

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <html
      lang={locale}
      className={`${notoSansJP.className}`}
      suppressHydrationWarning
    >
      <head>
        {/* Looker Studio ドメインへの事前接続でパフォーマンス向上 */}
        <link rel="preconnect" href="https://lookerstudio.google.com" />
        <link rel="dns-prefetch" href="https://lookerstudio.google.com" />
        {/* 構造化データ: Organization と sameAs で公式Xアカウントとの関連を示す */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'VCharts',
              url: 'https://www.vcharts.net',
              logo: 'https://www.vcharts.net/icon.svg',
              sameAs: ['https://x.com/VCharts_net']
            })
          }}
        />
      </head>
      <ClarityScript />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <body className="text-sm sm:text-base" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <NextTopLoader color="var(--primary)" showSpinner={false} />
            <NextIntlClientProvider>
              <PWAInstallProvider>{children}</PWAInstallProvider>
              <Toaster richColors />
              <DailyLoginBonus session={session} />
            </NextIntlClientProvider>
            <SessionKeepAlive />
          </SessionProvider>
        </ThemeProvider>

        {/* Google AdSense */}
        <AdsByGoogleScript strategy="beforeInteractive" />
      </body>
    </html>
  )
}
