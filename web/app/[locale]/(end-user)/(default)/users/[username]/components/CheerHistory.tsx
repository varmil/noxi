import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getCheerTicketUsages } from 'apis/cheer-ticket-usages/getCheerTicketUsages'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import CheerTicketUsages from 'features/cheer-ticket-usage/components/CheerTicketUsages'

interface CheerHistoryProps {
  profile: UserProfileSchema
}

export async function CheerHistory({ profile }: CheerHistoryProps) {
  const [usages] = await Promise.all([
    getCheerTicketUsages({
      userId: profile.userId,
      orderBy: [
        {
          field: 'usedAt',
          order: 'desc'
        }
      ],
      limit: 30
    })
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の応援履歴</CardTitle>
        <CardDescription>
          {profile.name}さんが最近応援したタレント
        </CardDescription>
      </CardHeader>
      <CardContent>
        {usages.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            応援履歴はありません
          </p>
        ) : (
          <CheerTicketUsages usages={usages} />
        )}
      </CardContent>
    </Card>
  )
}
