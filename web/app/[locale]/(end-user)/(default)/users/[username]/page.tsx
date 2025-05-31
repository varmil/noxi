import { notFound } from 'next/navigation'
import { Locale } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { getUserProfileByUsername } from 'apis/user-profiles/getUserProfile'
import { Page } from 'components/page'
import { CheerHistoryTabs } from 'features/user-public-profile/components/CheerHistoryTabs'
import { CheerOverviewThisSeason } from 'features/user-public-profile/components/CheerOverviewThisSeason'
import { ProfileHeader } from './components/ProfileHeader'

type Props = {
  params: Promise<{ locale: Locale; username: string }>
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

        <div className="flex flex-col gap-y-8 md:flex-row md:gap-4 lg:gap-6 mt-8">
          <div className="min-w-[215px]">
            <CheerOverviewThisSeason profile={profile} />
          </div>

          <CheerHistoryTabs profile={profile} className="flex-1" />
        </div>
      </div>
    </Page>
  )
}
