import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import RankBadge from 'features/supers-ranking/components/RankBadge'
import { getGroup } from 'lib/server-only-context/cache'

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

const periods = [
  { id: '24h', label: '過去24時間' },
  { id: '7d', label: '過去7日間' },
  { id: '30d', label: '過去30日間' }
]

{
  /* TODO: getSupersRankings() fetchしたデータを表示 */
}
export default function SupersRanking({ channelId }: { channelId: string }) {
  const global = useTranslations('Global.period')
  const group = getGroup()

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

      {/* TODO: mapをやめてfetchしたデータを表示 */}
      {periods.map(period => (
        <Card key={period.id}>
          <CardHeader>
            <CardTitle>{period.label}のランキング</CardTitle>
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
                      <RankBadge
                        rank={vtuberData.rankings[period.id].overall.rank}
                      />
                      <span className="text-muted-foreground">位</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ComparisonValue
                      change={vtuberData.rankings[period.id].overall.change}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    {vtuberData.gender}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <RankBadge
                        rank={vtuberData.rankings[period.id].gender.rank}
                      />
                      <span className="text-muted-foreground">位</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ComparisonValue
                      change={vtuberData.rankings[period.id].gender.change}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    {vtuberData.group}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <RankBadge
                        rank={vtuberData.rankings[period.id].group.rank}
                      />
                      <span className="text-muted-foreground">位</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ComparisonValue
                      change={vtuberData.rankings[period.id].group.change}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

const ComparisonValue = ({ change }) => {
  const Icon = change.direction === 'up' ? ArrowUpIcon : ArrowDownIcon
  const color = change.direction === 'up' ? 'text-green-500' : 'text-red-500'

  return (
    <span className={`flex items-center ${color} text-sm font-medium`}>
      <Icon
        className="w-4 h-4 mr-1"
        aria-label={change.direction === 'up' ? '上昇' : '下降'}
      />
      {change.value}
    </span>
  )
}
