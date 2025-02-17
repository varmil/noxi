import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table'
import { getChannel } from 'apis/youtube/getChannel'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { getSupersRankingHistories } from 'apis/youtube/getSupersRankingHistories'
import { getSupersRankings } from 'apis/youtube/getSupersRankings'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import { GroupString } from 'config/constants/Site'
import RankBadge from 'features/supers-ranking/components/RankBadge'
import LinkCell from 'features/supers-ranking/components/table/cell/base/LinkCell'
import { rangeDatetimeForPreviousPeriod } from 'features/supers-ranking/utils/previous-period'
import { getGroup } from 'lib/server-only-context/cache'
import { Gender } from 'types/gender'
import { Period } from 'types/period'
import { RankingType } from 'types/supers-ranking'
import { getUpdatedAt } from 'utils/ranking/ranking'
import ComparedToPreviousPeriod from './ComparedToPreviousPeriod'

export default async function SupersRanking({
  channelId,
  period
}: {
  channelId: string
  period: Period
}) {
  const baseParams = (rankingType: RankingType) => ({
    channelId,
    period,
    rankingType
  })
  const historiesParams = (rankingType: RankingType) => ({
    ...baseParams(rankingType),
    createdAfter: rangeDatetimeForPreviousPeriod(period).gte,
    createdBefore: rangeDatetimeForPreviousPeriod(period).lte,
    limit: 1
  })
  const group = getGroup()
  const [
    format,
    global,
    feat,
    overallRanking,
    genderRanking,
    groupRanking,
    [overallPreviousPeriodRanking],
    [genderPreviousPeriodRanking],
    [groupPreviousPeriodRanking],
    channel
  ] = await Promise.all([
    getFormatter(),
    getTranslations('Global'),
    getTranslations('Features.supersRanking'),
    getSupersRankings(baseParams('overall')),
    getSupersRankings(baseParams('gender')),
    getSupersRankings(baseParams('group')),
    getSupersRankingHistories(historiesParams('overall')),
    getSupersRankingHistories(historiesParams('gender')),
    getSupersRankingHistories(historiesParams('group')),
    getChannel(channelId)
  ])
  const [overallChannelsCount, genderChannelsCount, groupChannelsCount] =
    await Promise.all([
      getChannelsCount({}),
      getChannelsCount({ gender: channel.peakX.gender }),
      getChannelsCount({ group: channel.peakX.group })
    ])

  const updatedAt = format.relativeTime(
    getUpdatedAt(period, new Date()).toDate()
  )

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
          <CardDescription>
            {global('datetime.updatedAt', { updatedAt })}
          </CardDescription>
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
                {/* 2xl-: More */}
                <TableHead className="hidden @2xl:table-cell"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* OVERALL: period */}
              <TableRow>
                <LinkCell className="font-medium" period={period}>
                  {feat('overall')}
                </LinkCell>
                <RankCell rank={overallRanking?.rank} period={period} />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="justify-end"
                    current={overallRanking?.rank}
                    previous={overallPreviousPeriodRanking?.rank}
                    totalNumber={overallChannelsCount}
                    // TODO: データが溜まったら消す
                    counting={period !== 'last24Hours'}
                  />
                </TableCell>
                <SeeMoreCell period={period} />
              </TableRow>

              {/* GENDER: period + gender */}
              <TableRow>
                <LinkCell
                  className="font-medium"
                  period={period}
                  gender={channel.peakX.gender}
                >
                  {global(`gender.${channel.peakX.gender}`)}
                </LinkCell>
                <RankCell
                  rank={genderRanking?.rank}
                  period={period}
                  gender={channel.peakX.gender}
                />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="justify-end"
                    current={genderRanking?.rank}
                    previous={genderPreviousPeriodRanking?.rank}
                    totalNumber={genderChannelsCount}
                    // TODO: データが溜まったら消す
                    counting={period !== 'last24Hours'}
                  />
                </TableCell>
                <SeeMoreCell period={period} gender={channel.peakX.gender} />
              </TableRow>

              {/* GROUP: period + group */}
              <TableRow>
                <LinkCell
                  className="font-medium"
                  period={period}
                  group={channel.peakX.group}
                >
                  {global(`group.${channel.peakX.group}`)}
                </LinkCell>
                <RankCell
                  rank={groupRanking?.rank}
                  period={period}
                  group={channel.peakX.group}
                />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="justify-end"
                    current={groupRanking?.rank}
                    previous={groupPreviousPeriodRanking?.rank}
                    totalNumber={groupChannelsCount}
                    // TODO: データが溜まったら消す
                    counting={period !== 'last24Hours'}
                  />
                </TableCell>
                <SeeMoreCell period={period} group={channel.peakX.group} />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-muted-foreground">
          {feat('description', { channel: channel.basicInfo.title })}
        </CardFooter>
      </Card>
    </>
  )
}

function RankCell({
  rank,
  period,
  group,
  gender
}: {
  rank?: number
  period: Period
  group?: GroupString
  gender?: Gender
}) {
  return (
    <LinkCell align="center" period={period} group={group} gender={gender}>
      <RankBadge rank={rank} />
    </LinkCell>
  )
}

function SeeMoreCell({
  period,
  group,
  gender
}: {
  period: Period
  group?: GroupString
  gender?: Gender
}) {
  const feat = useTranslations('Features.supersRanking')
  return (
    <LinkCell
      className="hidden @2xl:table-cell"
      align="right"
      width={250}
      period={period}
      group={group}
      gender={gender}
    >
      <Button variant="secondary" className="cursor-pointer">
        {feat('more')}
        <ArrowUpRight className="ml-1 w-4 h-4" />
      </Button>
    </LinkCell>
  )
}
