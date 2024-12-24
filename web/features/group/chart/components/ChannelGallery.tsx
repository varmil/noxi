import { PropsWithoutRef, Suspense } from 'react'
import { List, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { getChannels } from 'apis/youtube/getChannels'
import { ChannelCards } from 'components/youtube/channel/ChannelCards'
import { Link } from 'lib/navigation'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  limit: number
  footer?: boolean
}

export async function ChannelGallery({
  limit,
  footer
}: PropsWithoutRef<Props>) {
  const group = (await getTranslations('Global.group'))(`${getGroup()}`)
  const t = await getTranslations('Features.group.talents')
  const channels = await getChannels({
    group: getGroup(),
    orderBy: [{ field: 'subscriberCount', order: 'desc' }],
    limit
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-muted-foreground" />
          {t('title', { group })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p>Loading cards...</p>}>
          <ChannelCards channels={channels} />
        </Suspense>
      </CardContent>
      {footer && (
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href={`${getGroup()}/charts/channels`}>
              <List className="mr-2 h-4 w-4" /> Go to full list
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
