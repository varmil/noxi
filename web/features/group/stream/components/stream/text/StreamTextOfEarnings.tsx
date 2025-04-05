import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { SupersBundleSchema } from 'apis/youtube/schema/supersBundleSchema'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

type Props = {
  supersBundle?: SupersBundleSchema
  className?: string
}

export default async function StreamTextOfEarnings({
  supersBundle,
  className
}: PropsWithoutRef<Props>) {
  if (!supersBundle) return <span className={className}>---</span>

  const t = await getTranslations('Features.stream')
  const { amountMicros } = supersBundle
  return (
    <div className={`flex items-baseline gap-0.5 ${className || ''}`}>
      <JapaneseYen className="size-3" />
      <span className="text-sm font-bold" aria-label={t('earningsLabel')}>
        {formatMicrosAsRoundedAmount(amountMicros)}
      </span>
    </div>
  )
}
