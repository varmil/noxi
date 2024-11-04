import { PropsWithoutRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  StreamRankingTable,
  StreamRankingTableTitle
} from 'features/stream-ranking/components/StreamRankingTable'

type Props = {}

export default function StreamRankingGallery({}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StreamRankingTableTitle className="px-4 sm:px-6" />
      <CardContent className="px-4 sm:px-6">
        <StreamRankingTable />
      </CardContent>
    </Card>
  )
}
