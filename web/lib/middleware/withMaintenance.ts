import { get } from '@vercel/edge-config'
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

const BYPASS_COOKIE_NAME = 'bypass_maintenance'

/**
 * Vercel Edge Config を使ったメンテナンスモード
 * Edge Config の isInMaintenanceMode が true の場合、/maintenance にリライトする
 * bypassToken クエリパラメータまたは Cookie で管理者はバイパス可能
 */
export const withMaintenance: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { pathname } = request.nextUrl

    // メンテナンスページ自体へのアクセスはスキップ
    if (pathname === '/maintenance') {
      return next(request, event)
    }

    try {
      const isInMaintenanceMode = await get<boolean>('isInMaintenanceMode')
      if (!isInMaintenanceMode) {
        return next(request, event)
      }

      const bypassToken = await get<string>('bypassToken')

      // Cookie によるバイパス判定
      const hasBypassCookie =
        request.cookies.get(BYPASS_COOKIE_NAME)?.value === bypassToken

      if (hasBypassCookie) {
        return next(request, event)
      }

      // クエリパラメータによるバイパス＆Cookie 発行
      const queryToken = request.nextUrl.searchParams.get('bypass')
      if (bypassToken && queryToken === bypassToken) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.searchParams.delete('bypass')
        const response = NextResponse.redirect(redirectUrl)
        response.cookies.set(BYPASS_COOKIE_NAME, queryToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/'
        })
        return response
      }

      // メンテナンス画面へリライト
      const url = request.nextUrl.clone()
      url.pathname = '/maintenance'
      return NextResponse.rewrite(url)
    } catch (error) {
      // Edge Config が利用できない場合はスキップ
      console.error('Failed to check maintenance mode:', error)
    }

    return next(request, event)
  }
}
