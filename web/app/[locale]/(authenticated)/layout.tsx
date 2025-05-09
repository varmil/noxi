import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import DashboardNav from 'app/[locale]/(authenticated)/dashboard/components/DashboardNav'
import Header from 'components/header/Header'
import DefaultLayout from 'components/layouts/DefaultLayout'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  // const { locale } = await props.params
  // const global = await getTranslations({ locale, namespace: 'Global' })
  return {
    robots: { index: false }
  }
}

export default async function AuthenticatedLayout({
  children,
  params
}: PropsWithChildren<Props>) {
  setRequestLocale((await params).locale)

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
