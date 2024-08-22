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
import { ChannelCards } from 'components/youtube/channel/ChannelCards'
import { getChartOfChannels } from 'features/hololive/chart/api/getChartOfChannels'
import { Link } from 'lib/navigation'

type Props = {
  limit: number
  footer?: boolean
}

export async function HololiveChart({ limit, footer }: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.charts')
  const channels = await getChartOfChannels({
    limit
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('cardTitle')}</CardTitle>
        <CardDescription>{t('cardDescription')}</CardDescription>
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
