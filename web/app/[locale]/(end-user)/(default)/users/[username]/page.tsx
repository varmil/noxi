import { notFound } from 'next/navigation'
import { Locale } from 'next-intl'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUserProfileByUsername } from 'apis/user-profiles/getUserProfile'
import { Page } from 'components/page'
import { CheerHistory } from './components/CheerHistory'
import { CommentHistory } from './components/CommentHistory'
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
      <div className="mx-auto py-4">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader profile={profile} />

          <Tabs defaultValue="support" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="support">応援履歴</TabsTrigger>
              <TabsTrigger value="comments" disabled>
                コメント (up next)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="support" className="mt-4">
              <CheerHistory profile={profile} />
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <CommentHistory username={profile.username} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Page>
  )
}
