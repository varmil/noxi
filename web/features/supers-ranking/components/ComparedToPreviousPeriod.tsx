import { useTranslations } from 'next-intl'
import Difference from 'components/styles/string/Difference'

type Props = {
  /** 今回の順位 */
  current?: number
  /** 前回の順位 */
  previous?: number
  /** 今回の母数 */
  totalNumber: number
  /** 集計中 */
  counting?: boolean
  className?: string
}
export default function ComparedToPreviousPeriod({
  current,
  previous,
  totalNumber,
  counting,
  className
}: Props) {
  const feat = useTranslations('Components.ranking.base')
  if (counting) {
    return (
      <span className="text-xs text-muted-foreground">{feat('counting')}</span>
    )
  }

  let diff: number = 0

  // CASE: 前回：圏外　今回：圏内
  // →　母数 - 今回の順位
  if (previous === undefined && current !== undefined) {
    diff = totalNumber - current
  }
  // CASE: 前回：圏内　今回：圏外
  // →　前回の順位 - 母数
  else if (previous !== undefined && current === undefined) {
    diff = previous - totalNumber
  }
  // CASE: 前回：圏外　今回：圏外
  // →　変化なしとする
  else if (previous === undefined && current === undefined) {
    diff = 0
  }
  // CASE: 前回：圏内　今回：圏内
  // →　前回の順位 - 今回の順位
  else if (previous && current) {
    diff = previous - current
  }

  return <Difference diff={diff} className={className} />
}
