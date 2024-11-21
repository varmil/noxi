import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { PageXSPX } from 'components/page'
import StreamRankingTable from 'features/stream-ranking/components/table/StreamRankingTable'
import StreamRankingTableTitle from 'features/stream-ranking/components/table/StreamRankingTableTitle'
import { Link } from 'lib/navigation'

type Props = { compact?: boolean }

export default function StreamRankingGallery({
  compact
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.streamRanking')
  return (
    <section className="@container space-y-4">
      <StreamRankingTableTitle
        className={`${!compact ? PageXSPX : ''} sm:px-0`}
      />

      <StreamRankingTable compact={compact} />

      {compact && (
        <Button variant={'outline'} asChild className="w-full gap-1">
          <Link href="/youtube/live">
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </section>
  )
}
