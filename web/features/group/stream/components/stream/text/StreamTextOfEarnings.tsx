import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { SupersBundleSchema } from 'apis/youtube/schema/supersBundleSchema'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

type Props = {
  supersBundle?: SupersBundleSchema
}

export default async function StreamTextOfEarnings({
  supersBundle
}: PropsWithoutRef<Props>) {
  if (!supersBundle) return null
  const { amountMicros } = supersBundle
  return (
    <div className="flex items-center gap-0.5">
      <JapaneseYen className="w-3 h-3" />
      <span className="font-medium" aria-label="スパチャ収益">
        {formatMicrosAsRoundedAmount(amountMicros)}
      </span>
    </div>
  )
}
