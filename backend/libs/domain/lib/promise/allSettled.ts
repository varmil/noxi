/**
 * Logging Error
 * @param promises
 * @returns
 */
export const allSettled = async <T>(
  promises: Promise<T>[]
): Promise<PromiseSettledResult<T>[]> => {
  const result = await Promise.allSettled(promises)

  result
    .filter(e => e.status === 'rejected')
    .forEach(e => console.error(e.reason))

  return result
}
