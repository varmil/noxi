import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { getUserProfileByUsername } from 'apis/user-profiles/getUserProfile'
import { Page } from 'components/page'
import { CheerHistoryTabs } from 'features/user-public-profile/components/CheerHistoryTabs'
import { ProfileHeader } from './components/ProfileHeader'

type Props = {
  params: Promise<{
    locale: string
    username: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const profile = await getUserProfileByUsername(username)

  if (!profile) {
    return {
      title: 'User Not Found - VCharts'
    }
  }

  return {
    title: `${profile.name} - VCharts`
  }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params
  const profile = await getUserProfileByUsername(username)

  // ユーザーが存在しない場合は404ページを表示
  if (!profile) {
    notFound()
  }

  return (
    <Page>
      <div className="max-w-4xl mx-auto">
        <ProfileHeader profile={profile} />
        <Separator />

        <div className="mt-8">
          <CheerHistoryTabs profile={profile} className="flex-1" />
        </div>
      </div>
    </Page>
  )
}
