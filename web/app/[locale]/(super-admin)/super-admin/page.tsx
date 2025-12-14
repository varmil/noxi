import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing } from 'config/i18n/routing'
import { SuperAdminDashboard } from 'features/super-admin/components/SuperAdminDashboard'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({}: Props): Promise<Metadata> {
  return { robots: { index: false, follow: false } }
}

export default async function SuperAdminPage(props: Props) {
  const params = await props.params

  const { locale } = params

  // Validate that the locale is supported
  if (!routing.locales.includes(locale as any)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <>
      <SuperAdminDashboard />
    </>
  )
}
