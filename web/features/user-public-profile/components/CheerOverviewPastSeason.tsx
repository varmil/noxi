import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getFanRank } from 'apis/cheer-ticket-usages/getFanRank'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import dayjs from 'lib/dayjs'

export async function CheerOverviewPastSeason({
  profile
}: {
  profile: UserProfileSchema
}) {
  const [fanRank] = await Promise.all([
    getFanRank({
      userId: profile.userId,
      usedAt: {
        gte: dayjs().subtract(365, 'days').toDate() // 便宜的に１年にしておく
      }
    })
  ])

  const seasons = [
    {
      season: 'S2025 β',
      tier: 'ongoing...',
      count: fanRank?.usedCount.toLocaleString() ?? '--'
    }
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Season</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {seasons.map(e => (
          <TableRow key={e.season}>
            <TableCell className="font-medium">{e.season}</TableCell>
            <TableCell className="text-muted-foreground">{e.tier}</TableCell>
            <TableCell className="text-right text-muted-foreground">
              {e.count}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
