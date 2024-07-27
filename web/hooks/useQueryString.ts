import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Use with 'use client'
 */
export default function useQueryString() {
  const searchParams = useSearchParams()

  const has = (key: string, value?: string) => searchParams.has(key, value)

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

  return {
    has,

    /**
     * Get a new searchParams string by merging the current
     * searchParams with a provided key/value pair
     */
    createQueryString
  }
}
