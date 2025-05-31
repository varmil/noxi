import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFanRank } from 'apis/cheer-ticket-usages/getFanRank'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import { MutedCheerStat } from 'components/cheer-stats/MutedCheerStat'
import dayjs from 'lib/dayjs'
import { CheerOverviewPastSeason } from './CheerOverviewPastSeason'

type Props = {
  profile: UserProfileSchema
}

export async function CheerOverviewThisSeason({ profile }: Props) {
  const [global, featUserPublicProfile, featCheerChannel, fanRank] =
    await Promise.all([
      getTranslations('Global'),
      getTranslations('Features.userPublicProfile'),
      getTranslations('Features.cheerChannel'),
      getFanRank({
        userId: profile.userId,
        usedAt: {
          gte: dayjs().subtract(365, 'days').toDate() // 便宜的に１年にしておく
        }
      })
    ])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{featUserPublicProfile('overview.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex md:flex-col lg:flex-row gap-2">
          <MutedCheerStat
            title={featUserPublicProfile('overview.consumeCount')}
            description={
              fanRank?.usedCount ? (
                <>
                  {featCheerChannel('history.count', {
                    count: fanRank.usedCount.toLocaleString()
                  })}
                </>
              ) : (
                '--'
              )
            }
            className="flex-1"
          />
          <MutedCheerStat
            title={featUserPublicProfile('overview.rank')}
            description={
              fanRank?.rank ? (
                <>
                  {fanRank.rank.toLocaleString()}
                  {global('ranking.place', { rank: fanRank.rank })}
                </>
              ) : (
                '--'
              )
            }
            className="flex-1"
          />
        </div>

        <CheerOverviewPastSeason profile={profile} />
      </CardContent>
    </Card>
  )
}
