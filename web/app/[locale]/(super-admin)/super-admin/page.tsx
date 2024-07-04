import { unstable_setRequestLocale } from 'next-intl/server'
import { SuperAdminDashboard } from '@/components/super-admin-dashboard'

type Props = {
  params: { locale: string }
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
