export function calcPercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) {
    return current === 0 ? 0 : Infinity // 昨日の値が0なら増加率は無限大
  }

  const change = ((current - previous) / previous) * 100
  return change
}
