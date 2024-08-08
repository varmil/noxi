import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { SuperAdminDashboard } from 'features/super-admin/components/SuperAdminDashboard'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({}: Props): Promise<Metadata> {
  return { robots: { index: false, follow: false } }
}

export default function SuperAdminPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <>
      <SuperAdminDashboard />
    </>
  )
}
