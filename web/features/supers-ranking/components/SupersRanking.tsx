import { useTranslations } from 'next-intl'
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
import { getChannel } from 'apis/youtube/getChannel'
import { getSupersRankings } from 'apis/youtube/getSupersRankings'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import RankBadge from 'features/supers-ranking/components/RankBadge'
import { getGroup } from 'lib/server-only-context/cache'
import { Period } from 'types/period'
import ComparedToPreviousPeriod from './ComparedToPreviousPeriod'

export default async function SupersRanking({
  channelId,
  period
}: {
  channelId: string
  period: Period
}) {
  const [global, feat, overallRanking, genderRanking, groupRanking, channel] =
    await Promise.all([
      getTranslations('Global'),
      getTranslations('Features.supersRanking'),
      getSupersRankings({ channelId, period, rankingType: 'overall' }),
      getSupersRankings({ channelId, period, rankingType: 'gender' }),
      getSupersRankings({ channelId, period, rankingType: 'group' }),
      getChannel(channelId)
    ])
  const group = getGroup()

  return (
    <>
      <LinkTabs
        className="mb-4"
        tabs={[
          {
            label: global('period.last24Hours'),
            href: `/${group}/channels/${channelId}`
          },
          {
            label: global('period.last7Days'),
            href: `/${group}/channels/${channelId}?period=last7Days`
          },
          {
            label: global('period.last30Days'),
            href: `/${group}/channels/${channelId}?period=last30Days`
          }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {feat('title', { period: global(`period.${period}`) })}
          </CardTitle>
        </CardHeader>
        <CardContent className="@container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{feat('rankingType')}</TableHead>
                <TableHead className="text-center">{feat('rank')}</TableHead>
                <TableHead className="text-right">
                  {feat('comparedToPreviousPeriod')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{feat('overall')}</TableCell>
                <RankCell rank={overallRanking.rank} />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="justify-end"
                    direction="up"
                    value={12}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {global(`gender.${channel.peakX.gender}`)}
                </TableCell>
                <RankCell rank={genderRanking.rank} />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="justify-end"
                    direction="down"
                    value={23}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {global(`group.${channel.peakX.group}`)}
                </TableCell>
                <RankCell rank={groupRanking.rank} />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="justify-end"
                    direction="up"
                    value={12}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

function RankCell({ rank }: { rank: number }) {
  const global = useTranslations('Global')
  return (
    <TableCell align="center">
      <div className="flex items-baseline justify-center space-x-1">
        <RankBadge rank={rank} />
        <span className="text-muted-foreground">
          {global.rich(`ranking.place`, { rank })}
        </span>
      </div>
    </TableCell>
  )
}
