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
import { getSupersRankingHistories } from 'apis/supers/getSupersRankingHistories'
import { getSupersRankings } from 'apis/supers/getSupersRankings'
import { getChannel } from 'apis/youtube/getChannel'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import Underline from 'components/styles/string/Underline'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import RankBadge from 'features/supers-ranking/components/RankBadge'
import LinkCell from 'features/supers-ranking/components/table/cell/base/LinkCell'
import { getGroup } from 'lib/server-only-context/cache'
import { Gender } from 'types/gender'
import { Period } from 'types/period'
import { RankingType } from 'types/ranking'
import { rangeDatetimeForPreviousPeriod } from 'utils/period/period'
import { getUpdatedAt } from 'utils/period/ranking'
import ComparedToPreviousPeriod from './ComparedToPreviousPeriod'

export default async function SupersRanking({
  channelId,
  period
}: {
  channelId: string
  period: Period
}) {
  const currentParams = (rankingType: RankingType) => ({
    channelId,
    period,
    rankingType
  })
  const historiesParams = (rankingType: RankingType) => ({
    channelIds: [channelId],
    period,
    rankingType,
    createdAfter: rangeDatetimeForPreviousPeriod(period).gte,
    createdBefore: rangeDatetimeForPreviousPeriod(period).lte,
    limit: 1
  })
  const group = getGroup()
  const [
    format,
    global,
    comp,
    feat,
    overallRanking,
    genderRanking,
    groupRanking,
    [overallPreviousPeriodRanking] = [undefined],
    [genderPreviousPeriodRanking] = [undefined],
    [groupPreviousPeriodRanking] = [undefined],
    channel
  ] = await Promise.all([
    getFormatter(),
    getTranslations('Global'),
    getTranslations('Components.ranking.base'),
    getTranslations('Features.supersRanking'),
    getSupersRankings(currentParams('overall')),
    getSupersRankings(currentParams('gender')),
    getSupersRankings(currentParams('group')),
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
    <div>
      <LinkTabs
        className="mb-4"
        tabs={[
          {
            label: global('period.last24Hours'),
            href: `/${group}/channels/${channelId}/super-chat?period=last24Hours`
          },
          {
            label: global('period.last7Days'),
            href: `/${group}/channels/${channelId}/super-chat?period=last7Days`
          },
          {
            label: global('period.last30Days'),
            href: `/${group}/channels/${channelId}/super-chat`
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
                <TableHead>{comp('rankingType')}</TableHead>
                <TableHead className="text-center">{comp('rank')}</TableHead>
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
                <LinkCell className="font-medium" group="all" period={period}>
                  <Underline>{comp('overall')}</Underline>
                </LinkCell>
                <RankCell
                  rank={overallRanking?.rank}
                  group="all"
                  period={period}
                  channelId={channelId}
                />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="flex justify-end"
                    current={overallRanking?.rank}
                    previous={overallPreviousPeriodRanking?.rank}
                    totalNumber={overallChannelsCount}
                  />
                </TableCell>
                <SeeMoreCell group="all" period={period} />
              </TableRow>

              {/* GENDER: period + gender */}
              <TableRow>
                <LinkCell
                  className="font-medium"
                  group="all"
                  period={period}
                  gender={channel.peakX.gender}
                >
                  <Underline>
                    {global(`gender.${channel.peakX.gender}`)}
                  </Underline>
                </LinkCell>
                <RankCell
                  rank={genderRanking?.rank}
                  group="all"
                  period={period}
                  gender={channel.peakX.gender}
                  channelId={channelId}
                />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="flex justify-end"
                    current={genderRanking?.rank}
                    previous={genderPreviousPeriodRanking?.rank}
                    totalNumber={genderChannelsCount}
                  />
                </TableCell>
                <SeeMoreCell
                  group="all"
                  period={period}
                  gender={channel.peakX.gender}
                />
              </TableRow>

              {/* GROUP: period + group */}
              <TableRow>
                <LinkCell
                  className="font-medium"
                  group={channel.peakX.group}
                  period={period}
                >
                  <Underline>
                    {(global as any)(`group.${channel.peakX.group}`)}
                  </Underline>
                </LinkCell>
                <RankCell
                  rank={groupRanking?.rank}
                  group={channel.peakX.group}
                  period={period}
                  channelId={channelId}
                />
                <TableCell align="right">
                  <ComparedToPreviousPeriod
                    className="flex justify-end"
                    current={groupRanking?.rank}
                    previous={groupPreviousPeriodRanking?.rank}
                    totalNumber={groupChannelsCount}
                  />
                </TableCell>
                <SeeMoreCell group={channel.peakX.group} period={period} />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          {feat('description')}
        </CardFooter>
      </Card>
    </div>
  )
}

function RankCell({
  rank,
  period,
  group,
  gender,
  channelId
}: {
  rank?: number
  period: Period
  group: string
  gender?: Gender
  channelId?: string
}) {
  return (
    <LinkCell
      align="center"
      period={period}
      group={group}
      gender={gender}
      page={ChannelsRankingPagination.getPageFromRank(rank)}
      highlightedChannelId={channelId}
    >
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
  group: string
  gender?: Gender
}) {
  const feat = useTranslations('Features.supersRanking')
  return (
    <LinkCell
      className="hidden @xl:table-cell"
      align="right"
      width={250}
      period={period}
      group={group}
      gender={gender}
    >
      <Button variant="outline" className="cursor-pointer">
        {feat('more')}
        <ArrowUpRight className="ml-1 w-4 h-4" />
      </Button>
    </LinkCell>
  )
}
