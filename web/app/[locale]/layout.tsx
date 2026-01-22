import { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Noto_Sans_JP } from 'next/font/google'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/sonner'
import { SessionKeepAlive } from 'components/auth/session/SessionKeepAlive'
import { DailyLoginBonus } from 'components/login-bonus/DailyLoginBonus'
import { ClarityScript } from 'components/script/ClarityScript'
import { SidebarProvider } from 'components/sidebar/SidebarContext'
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0b09' }
  ]
}

export default async function LocaleLayout(props: Props) {
  const [{ locale }, session, cookieStore] = await Promise.all([
    props.params,
    auth(),
    cookies()
  ])
  const { children } = props

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  // サイドバーの開閉状態をCookieから取得（デフォルトは閉じた状態）
  const sidebarOpen = cookieStore.get('sidebar-open')?.value === 'true'

  return (
    <html
      lang={locale}
      className={`${notoSansJP.className}`}
      suppressHydrationWarning
    >
      <head>
        {/* 構造化データ: Organization と sameAs で公式Xアカウントとの関連を示す */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'VCharts',
              url: 'https://www.vcharts.net',
              logo: 'https://www.vcharts.net/icon2.png',
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
              <SidebarProvider defaultOpen={sidebarOpen}>
                {children}
              </SidebarProvider>
              <Toaster richColors />
              <DailyLoginBonus session={session} />
            </NextIntlClientProvider>
            <SessionKeepAlive />
          </SessionProvider>
        </ThemeProvider>

        {/* Google AdSense */}
        {/* <AdsByGoogleScript strategy="beforeInteractive" /> */}
      </body>
    </html>
  )
}
