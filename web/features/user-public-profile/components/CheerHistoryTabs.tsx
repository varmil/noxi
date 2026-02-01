import { Construction } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
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
        <TabsTrigger value="support">ハイパーチャット履歴</TabsTrigger>
        <TabsTrigger value="comments" disabled>
          コメント (up next)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="support">
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Construction className="size-10 mb-3" />
          <p className="text-sm font-medium">Coming Soon</p>
          <p className="text-xs">ハイパーチャット機能は現在開発中です</p>
        </div>
      </TabsContent>
      <TabsContent value="comments">
        <CommentHistory username={profile.username} />
      </TabsContent>
    </Tabs>
  )
}
