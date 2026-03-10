import { Metadata } from 'next'
import { getGroups } from 'apis/groups'
import { Page } from 'components/page'
import { RegistrationForm } from './_components/form/RegistrationForm'
import { HistoryList } from './_components/history/HistoryList'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'チャンネル登録申請 - VCharts',
    description: 'YouTubeチャンネルを登録するための申請フォーム'
  }
}

export default async function ChannelsAddPage() {
  let groups: Array<{ id: string; name: string; iconSrc: string }> = []

  try {
    groups = await getGroups()
  } catch (error) {
    console.error('Failed to fetch groups', error)
  }

  return (
    <Page
      breadcrumb={[{ href: `/channels/add`, name: 'チャンネル登録申請' }]}
      className="mx-auto py-6 space-y-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
        YouTubeチャンネル登録申請
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RegistrationForm groups={groups} />
        </div>
        <div className="lg:col-span-1">
          <HistoryList />
        </div>
      </div>
    </Page>
  )
}
