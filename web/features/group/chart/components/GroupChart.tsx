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
import { getChartOfChannels } from 'features/group/chart/api/getChartOfChannels'
import { Link } from 'lib/navigation'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  limit: number
  footer?: boolean
}

export async function GroupChart({ limit, footer }: PropsWithoutRef<Props>) {
  const group = (await getTranslations('Global.group'))(`${getGroup()}`)
  const t = await getTranslations('Page.group.charts')
  const channels = await getChartOfChannels({
    group: getGroup(),
    limit
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('cardTitle', { group })}
        </CardTitle>
        <CardDescription>{t('cardDescription', { group })}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p>Loading cards...</p>}>
          <ChannelCards channels={channels} />
        </Suspense>
      </CardContent>
      {footer && (
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href={`${getGroup()}/charts/channels`} prefetch={true}>
              <List className="mr-2 h-4 w-4" /> Go to full list
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
