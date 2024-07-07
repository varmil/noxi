type Range = {
  min: number
  max: number
}

/**
 * @param value the value to apply scaling
 * @param range
 * @returns 0 - 1 scaled value
 */
export const normalize = (value: number, { min, max }: Range) => {
  let n = (value - min) / (max - min)
  n = Math.max(0, n)
  n = Math.min(n, 1)
  return n
}
