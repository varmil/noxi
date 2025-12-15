import { ReactNode } from 'react'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import DashboardNav from 'app/[locale]/(authenticated)/dashboard/components/DashboardNav'
import Header from 'components/header/Header'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { routing } from 'config/i18n/routing'

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: { index: false }
  }
}

export default async function AuthenticatedLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate that the locale is supported
  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  setRequestLocale(locale as 'ja' | 'en')

  return (
    <DefaultLayout>
      <Header className={`z-30 mb-4`} />

      <main className="z-0 container max-w-4xl px-4 sm:px-6 py-4">
        <h1 className="text-3xl font-bold mb-8">マイページ</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <DashboardNav />
          </div>
          <div className="md:col-span-3">{children}</div>
        </div>
      </main>
    </DefaultLayout>
  )
}
