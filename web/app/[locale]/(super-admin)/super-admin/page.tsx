import { SuperAdminDashboard } from 'features/super-admin/components/SuperAdminDashboard'
import { unstable_setRequestLocale } from 'next-intl/server'

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
