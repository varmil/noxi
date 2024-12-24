import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Use with 'use client'
 */
export default function useQueryString() {
  const searchParams = useSearchParams()

  const has = (key: string, value?: string) => searchParams.has(key, value)

  const get = (key: string) => searchParams.get(key)

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const createQueryStrings = useCallback(
    (record: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(record).forEach(([name, value]) => {
        if (value === null) {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      })
      return params.toString()
    },
    [searchParams]
  )

  return {
    has,

    get,

    /**
     * Get a new searchParams string by merging the current
     * searchParams with a provided key/value pair
     */
    createQueryString,

    /**
     * Get a new searchParams string by merging the current
     * searchParams with multiple key/value pairs
     */
    createQueryStrings
  }
}
