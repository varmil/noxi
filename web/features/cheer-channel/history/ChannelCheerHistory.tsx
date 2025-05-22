import { ArrowUpRight, Tickets } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getCheerTicketUsages } from 'apis/cheer-ticket-usages/getCheerTicketUsages'
import { getUserProfiles } from 'apis/user-profiles/getUserProfiles'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import FirstCheerAlert from 'features/cheer-channel/alert/FirstCheerAlert'
import { Link } from 'lib/navigation'

interface Props {
  channel: ChannelSchema
}

export async function ChannelCheerHistory({ channel }: Props) {
  const [format, feat, usages] = await Promise.all([
    getFormatter(),
    getTranslations('Features.cheerChannel.history'),
    getCheerTicketUsages({
      channelId: channel.basicInfo.id,
      orderBy: [
        {
          field: 'usedAt',
          order: 'desc'
        }
      ],
      limit: 20
    })
  ])
  const [profiles] = await Promise.all([
    getUserProfiles({
      userIds: usages.map(usage => usage.userId),
      limit: usages.length
    })
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Tickets className="mr-2 h-5 w-5 text-pink-700 dark:text-pink-500" />
            {feat('title')}
          </CardTitle>
          <CardDescription>
            {feat('description', { channel: channel.basicInfo.title })}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {usages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{feat('user')}</TableHead>
                  <TableHead className="text-right">
                    {feat('tickets')}
                  </TableHead>
                  <TableHead className="text-right">{feat('date')}</TableHead>
                  <TableHead className="hidden md:table-cell"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usages.map(item => {
                  const profile = profiles.find(
                    profile => profile.userId === item.userId
                  )
                  if (!profile) return null
                  return (
                    <TableRow key={item.usedAt.toISOString()}>
                      <TableCell width={500}>
                        <Link
                          href={`/users/${profile.username}`}
                          prefetch={false}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="size-8">
                              <AvatarImage
                                src={profile.image || '/placeholder.svg'}
                                alt={profile.name}
                              />
                              <AvatarFallback>
                                {profile.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium line-clamp-1 break-all">
                              {profile.name}
                            </span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="min-w-[80px] max-w-[100px]"
                      >
                        <Badge
                          variant="outline"
                          className={`flex w-full items-center justify-between ${
                            item.usedCount >= 5
                              ? 'border-pink-200 bg-pink-100/50 dark:border-pink-800 dark:bg-pink-950/50'
                              : ''
                          }`}
                        >
                          <Tickets className="mr-1 size-3 text-pink-700 dark:text-pink-500" />
                          <span className="flex-1">
                            {feat('count', { count: item.usedCount })}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="text-xs min-w-[60px] max-w-[100px] whitespace-nowrap text-muted-foreground"
                      >
                        {format.relativeTime(new Date(item.usedAt))}
                      </TableCell>
                      <TableCell
                        align="right"
                        className="hidden md:table-cell md:w-[150px]"
                      >
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          asChild
                        >
                          <Link
                            href={`/users/${profile.username}`}
                            prefetch={false}
                          >
                            {'See More'}
                            <ArrowUpRight className="ml-1 size-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <FirstCheerAlert channelTitle={channel.basicInfo.title} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
