import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getGroupRegistrations } from 'apis/groups'
import { routing } from 'config/i18n/routing'
import { GroupRegistrationManagement } from 'features/super-admin/components/GroupRegistrationManagement'
import { SuperAdminAside } from 'features/super-admin/components/SuperAdminAside'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({}: Props): Promise<Metadata> {
  return { robots: { index: false, follow: false } }
}

export default async function GroupRegistrationsPage(props: Props) {
  const params = await props.params
  const { locale } = params

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  setRequestLocale(locale as 'ja' | 'en')

  const registrations = await getGroupRegistrations()

  return (
    <div className="flex min-h-screen w-full">
      <SuperAdminAside />
      <div className="flex flex-col flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Group申請管理</h1>
        </header>
        <main className="flex-1 p-6">
          <GroupRegistrationManagement initialRegistrations={registrations} />
        </main>
      </div>
    </div>
  )
}
