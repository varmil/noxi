import { PropsWithoutRef } from 'react'
import { PageXSPX } from 'components/page'
import StreamRankingTable from 'features/stream-ranking/components/table/StreamRankingTable'
import StreamRankingTableTitle from 'features/stream-ranking/components/table/StreamRankingTableTitle'

type Props = { compact?: boolean }

export default function StreamRankingGallery({
  compact
}: PropsWithoutRef<Props>) {
  return (
    <section className="@container space-y-4">
      <StreamRankingTableTitle
        className={`${PageXSPX} sm:px-0`}
        showViewAll={compact}
      />
      <StreamRankingTable compact={compact} />
    </section>
  )
}
