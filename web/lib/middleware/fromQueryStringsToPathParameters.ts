import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

export const fromQueryStringsToPathParameters: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname, searchParams } = request.nextUrl

    // 対象の type パス（channels または live）
    const typeMatch = pathname.match(/^\/(ja|en)?\/?ranking\/(channels|live)$/)
    if (!typeMatch) return next(request, _next)

    const localePrefix = typeMatch[1] || '/ja' // 'ja' or 'en'
    const type = typeMatch[2] // 'channels' or 'live'

    // クエリパラメータ取得
    const period = searchParams.get('period')
    const dimension = searchParams.get('dimension')
    const group = searchParams.get('group') || 'all'

    // 必須パラメータチェック（dimension, period）
    if (!dimension || !period) {
      return next(request, _next)
    }

    const basePath = `${localePrefix}/ranking/${dimension}/${type}/${group}/${period}`

    // dimension, group, period 以外の残りクエリを再構築
    const retainedParams = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (!['dimension', 'group', 'period'].includes(key)) {
        retainedParams.append(key, value)
      }
    })

    // クエリをつけたURLを構築
    const finalURL = new URL(basePath, request.nextUrl.origin)
    if ([...retainedParams].length > 0) {
      finalURL.search = retainedParams.toString()
    }

    return NextResponse.redirect(finalURL)
  }
}
