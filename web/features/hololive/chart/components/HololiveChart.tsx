import { PropsWithoutRef, Suspense } from 'react'
import { List } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import Image from 'components/styles/Image'
import { ChannelCards } from 'components/youtube/channel/ChannelCards'
import Site from 'config/constants/Site'
import { getChartOfChannels } from 'features/hololive/chart/api/getChartOfChannels'
import { Link } from 'lib/navigation'

type Props = {
  group: (typeof Site.Groups)[number]
  limit: number
  footer?: boolean
}

export async function HololiveChart({
  group,
  limit,
  footer
}: PropsWithoutRef<Props>) {
  const tg = await getTranslations('Global')
  const t = await getTranslations('Page.group.charts')
  const channels = await getChartOfChannels({
    limit
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image
            src={'/hololiveicon.png'}
            alt={`Hololive icon`}
            width={100}
            height={100}
            className="w-6 h-6"
          />
          {t('cardTitle', { group: tg(`group.${group}`) })}
        </CardTitle>
        <CardDescription>
          {t('cardDescription', { group: tg(`group.${group}`) })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p>Loading cards...</p>}>
          <ChannelCards channels={channels} hololive />
        </Suspense>
      </CardContent>
      {footer && (
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="hololive/charts/channels" prefetch={true}>
              <List className="mr-2 h-4 w-4" /> Go to full list
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
