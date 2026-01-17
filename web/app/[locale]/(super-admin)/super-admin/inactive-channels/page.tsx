import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getInactiveChannels } from 'apis/inactive-channels/getInactiveChannels'
import { routing } from 'config/i18n/routing'
import { InactiveChannelManagement } from 'features/super-admin/components/InactiveChannelManagement'
import { SuperAdminAside } from 'features/super-admin/components/SuperAdminAside'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ months?: string }>
}

export async function generateMetadata({}: Props): Promise<Metadata> {
  return { robots: { index: false, follow: false } }
}

export default async function InactiveChannelsPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { locale } = params
  const months = searchParams.months ? parseInt(searchParams.months, 10) : 6

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  setRequestLocale(locale as 'ja' | 'en')

  const channels = await getInactiveChannels(months)

  return (
    <div className="flex min-h-screen w-full">
      <SuperAdminAside />
      <div className="flex flex-col flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">休止チャンネル管理</h1>
        </header>
        <main className="flex-1 p-6">
          <InactiveChannelManagement
            initialChannels={channels}
            initialMonths={months}
          />
        </main>
      </div>
    </div>
  )
}
