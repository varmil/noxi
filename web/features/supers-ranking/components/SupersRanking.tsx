import { getTranslations } from 'next-intl/server'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table'
import { getSupersRankings } from 'apis/youtube/getSupersRankings'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import RankBadge from 'features/supers-ranking/components/RankBadge'
import { getGroup } from 'lib/server-only-context/cache'
import { Period } from 'types/period'
import ComparedToPreviousPeriod from './ComparedToPreviousPeriod'

const vtuberData = {
  group: 'にじさんじ',
  gender: '女性',
  rankings: {
    '24h': {
      overall: { rank: 1, change: { direction: 'up', value: 2 } },
      gender: { rank: 2, change: { direction: 'down', value: 1 } },
      group: { rank: 3, change: { direction: 'up', value: 1 } }
    },
    '7d': {
      overall: { rank: 2, change: { direction: 'up', value: 15 } },
      gender: { rank: 1, change: { direction: 'down', value: 10 } },
      group: { rank: 3, change: { direction: 'up', value: 5 } }
    },
    '30d': {
      overall: { rank: 3, change: { direction: 'up', value: 30 } },
      gender: { rank: 2, change: { direction: 'down', value: 20 } },
      group: { rank: 1, change: { direction: 'up', value: 10 } }
    }
  }
}

export default async function SupersRanking({
  channelId,
  period
}: {
  channelId: string
  period: Period
}) {
  const [global, overallRanking, genderRanking, groupRanking] =
    await Promise.all([
      getTranslations('Global.period'),
      getSupersRankings({ channelId, period, rankingType: 'overall' }),
      getSupersRankings({ channelId, period, rankingType: 'gender' }),
      getSupersRankings({ channelId, period, rankingType: 'group' })
    ])
  const group = getGroup()
  console.log({ channelId, group, period })
  console.log({ overallRanking, genderRanking, groupRanking })

  return (
    <>
      <LinkTabs
        className="mb-4"
        tabs={[
          {
            label: global('last24Hours'),
            href: `/${group}/channels/${channelId}`
          },
          {
            label: global('last7Days'),
            href: `/${group}/channels/${channelId}?period=last7Days`
          },
          {
            label: global('last30Days'),
            href: `/${group}/channels/${channelId}?period=last30Days`
          }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>{global(period)}のランキング</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>カテゴリ</TableHead>
                <TableHead>順位</TableHead>
                <TableHead>前期間比</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">総合</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <RankBadge rank={overallRanking.rank} />
                    <span className="text-muted-foreground">位</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ComparedToPreviousPeriod direction="up" value={12} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {/* TODO: */}
                  {vtuberData.gender}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <RankBadge rank={genderRanking.rank} />
                    <span className="text-muted-foreground">位</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ComparedToPreviousPeriod direction="down" value={23} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {/* TODO: */}
                  {vtuberData.group}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <RankBadge rank={groupRanking.rank} />
                    <span className="text-muted-foreground">位</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ComparedToPreviousPeriod direction="up" value={12} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
