import { Metadata } from 'next'
import { Page } from 'components/page'
import { RegistrationForm } from './_components/form/RegistrationForm'
import { HistoryList } from './_components/history/HistoryList'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'VTuberチャンネル登録申請 - PeakX',
    description: 'VTuberのYouTubeチャンネルを登録するための申請フォーム'
  }
}

export default function Home() {
  return (
    <Page
      breadcrumb={[{ href: `/channels/add`, name: 'VTuberチャンネル登録申請' }]}
      className="mx-auto py-10 space-y-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
        VTuberチャンネル登録申請
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <RegistrationForm />
        </div>
        <div>
          <HistoryList />
        </div>
      </div>
    </Page>
  )
}
