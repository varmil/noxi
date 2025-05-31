import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import { CheerHistory } from 'features/user-public-profile/components/CheerHistory'
import { CommentHistory } from 'features/user-public-profile/components/CommentHistory'

export async function CheerHistoryTabs({
  profile,
  className
}: {
  profile: UserProfileSchema
  className?: string
}) {
  return (
    <Tabs defaultValue="support" className={className}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="support">応援履歴</TabsTrigger>
        <TabsTrigger value="comments" disabled>
          コメント (up next)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="support">
        <CheerHistory profile={profile} />
      </TabsContent>
      <TabsContent value="comments">
        <CommentHistory username={profile.username} />
      </TabsContent>
    </Tabs>
  )
}
