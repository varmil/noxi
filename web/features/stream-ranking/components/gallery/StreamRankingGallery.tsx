import { PropsWithoutRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import StreamRankingTable from 'features/stream-ranking/components/table/StreamRankingTable'
import StreamRankingTableTitle from 'features/stream-ranking/components/table/StreamRankingTableTitle'

type Props = { compact?: boolean }

export default function StreamRankingGallery({
  compact
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StreamRankingTableTitle className="px-4 sm:px-6" showViewAll={compact} />
      <CardContent className="px-4 sm:px-6">
        <StreamRankingTable />
      </CardContent>
    </Card>
  )
}
