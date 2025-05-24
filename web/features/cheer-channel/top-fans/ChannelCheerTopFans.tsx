import { Activity, Crown, Tickets } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getFanRanking } from 'apis/cheer-ticket-usages/getFanRanking'
import { getUserProfiles } from 'apis/user-profiles/getUserProfiles'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import FirstCheerAlert from 'features/cheer-channel/alert/FirstCheerAlert'
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

export async function ChannelCheerTopFans({
  channel
}: {
  channel: ChannelSchema
}) {
  const [feat, topFans] = await Promise.all([
    getTranslations('Features.cheerChannel.topFans'),
    getFanRanking({
      channelId: channel.basicInfo.id,
      usedAt: { gte: dayjs().subtract(30, 'day').toDate() },
      limit: 5
    })
  ])
  const [profiles] = await Promise.all([
    getUserProfiles({
      userIds: topFans.map(usage => usage.userId),
      limit: topFans.length
    })
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          <span className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-amber-700 dark:text-amber-500" />
            {feat('title')}
          </span>
        </CardTitle>
        <CardDescription>{feat('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {topFans.length === 0 && (
          <FirstCheerAlert channelTitle={channel.basicInfo.title} />
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {topFans.map((fan, index) => {
            const profile = profiles.find(
              profile => profile.userId === fan.userId
            )
            if (!profile) return null
            return (
              <Link
                href={`/users/${profile.username}`}
                key={fan.userId}
                className={`relative flex flex-col items-center rounded-xl p-4 text-center transition-all hover:bg-muted/50 ${
                  index === 0
                    ? 'col-span-full md:col-span-1 bg-gradient-to-b from-amber-50 to-transparent dark:from-yellow-700/30'
                    : ''
                }`}
              >
                <div className="relative mb-2">
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage
                      src={profile.image || '/placeholder.svg'}
                      alt={profile.name}
                    />
                    <AvatarFallback>
                      {profile.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  {index === 0 && (
                    <div className="absolute -left-1 -top-1 rounded-full bg-amber-500 p-1 text-white">
                      <Crown className="size-3" />
                    </div>
                  )}

                  {index === 1 && (
                    <div className="absolute -left-1 -top-1 rounded-full bg-slate-400 p-1 text-white">
                      <Crown className="size-3" />
                    </div>
                  )}

                  {index === 2 && (
                    <div className="absolute -left-1 -top-1 rounded-full bg-amber-700 p-1 text-white">
                      <Crown className="size-3" />
                    </div>
                  )}
                </div>

                <div className="text-sm font-medium line-clamp-1 break-all">
                  {profile.name}
                </div>

                <Badge
                  variant="outline"
                  className={`mt-1 ${
                    index === 0
                      ? 'border-amber-200 bg-amber-100/50 dark:border-amber-800 dark:bg-amber-950/50'
                      : ''
                  }`}
                >
                  <Tickets className="mr-1 size-3 text-pink-700 dark:text-pink-500" />
                  {feat('tickets', { count: fan.usedCount })}
                </Badge>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
