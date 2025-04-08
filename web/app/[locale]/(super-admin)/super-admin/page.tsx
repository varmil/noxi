import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { SuperAdminDashboard } from 'features/super-admin/components/SuperAdminDashboard'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({}: Props): Promise<Metadata> {
  return { robots: { index: false, follow: false } }
}

export default async function SuperAdminPage(props: Props) {
  const params = await props.params

  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <>
      <SuperAdminDashboard />
    </>
  )
}
