import { NextRequest, NextResponse } from 'next/server'
import { NextFetchEvent } from 'next/server'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'
import { normalizePathname } from 'lib/pathname'

const TARGET_PATHNAMES = ['/ranking/channels', '/ranking/live']

/**
 * 主にSEO対策用
 * rank, channelIdをクエリストリングから削除
 */
export const withRemoveQueryStrings: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const normalizedPathname = normalizePathname(request.nextUrl.pathname)

    if (TARGET_PATHNAMES.includes(normalizedPathname)) {
      const params = new URLSearchParams(request.nextUrl.search)
      let modified = false

      // 削除対象のクエリパラメータ
      const keysToRemove = ['rank', 'channelId']

      keysToRemove.forEach(key => {
        if (params.has(key)) {
          params.delete(key)
          modified = true
        }
      })

      // 削除された場合のみリダイレクト
      if (modified) {
        const newSearch = params.toString()
        const url = new URL(
          `${request.nextUrl.pathname}${newSearch ? '?' + newSearch : ''}`,
          request.url
        )
        return NextResponse.redirect(url, 301)
      }
    }

    return next(request, _next)
  }
}
