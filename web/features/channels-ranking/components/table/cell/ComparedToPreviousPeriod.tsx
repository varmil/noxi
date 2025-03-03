import DifferenceMini from 'components/styles/string/DifferenceMini'

type Props = {
  /** 今回の順位 */
  current?: number
  /** 前回の順位 */
  previous?: number
  /** 集計中 */
  counting?: boolean
  className?: string
}
export default function ComparedToPreviousPeriod({
  current,
  previous,
  counting,
  className
}: Props) {
  if (counting) {
    return null
  }

  let diff: number = 0

  // CASE: 前回：圏外　今回：圏内
  // →　固定値（矢印だけ出ればいいので、便宜的に１を入れる）
  if (previous === undefined && current !== undefined) {
    diff = 1
  }
  // CASE: 前回：圏内　今回：圏内
  // →　前回の順位 - 今回の順位
  else if (previous && current) {
    diff = previous - current
  }
  // それ以外
  else {
    return null
  }

  return <DifferenceMini diff={diff} className={className} />
}
