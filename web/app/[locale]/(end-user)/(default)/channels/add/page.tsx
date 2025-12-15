import { Metadata } from 'next'
import { getGroups } from 'apis/groups'
import { Page } from 'components/page'
import { RegistrationForm } from './_components/form/RegistrationForm'
import { HistoryList } from './_components/history/HistoryList'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'VTuberチャンネル登録申請',
    description: 'VTuberのYouTubeチャンネルを登録するための申請フォーム'
  }
}

export default async function ChannelsAddPage() {
  let groups: Array<{ id: string; name: string; iconSrc: string }> = []

  try {
    groups = await getGroups()
  } catch (error) {
    console.warn('Failed to fetch groups, using fallback:', error)
    // フォールバック用の基本的なグループ
    groups = [
      {
        id: 'hololive',
        name: 'ホロライブ',
        iconSrc: '/group/hololive/logo.png'
      },
      {
        id: 'nijisanji',
        name: 'にじさんじ',
        iconSrc: '/group/nijisanji/logo.png'
      },
      { id: 'vspo', name: 'ぶいすぽっ！', iconSrc: '/group/vspo/logo.png' },
      {
        id: 'independent',
        name: '個人勢',
        iconSrc: '/group/independent/logo.png'
      }
    ]
  }

  return (
    <Page
      breadcrumb={[{ href: `/channels/add`, name: 'VTuberチャンネル登録申請' }]}
      className="mx-auto py-6 space-y-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
        VTuberチャンネル登録申請
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
