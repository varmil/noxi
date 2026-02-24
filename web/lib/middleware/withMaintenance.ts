import { get } from '@vercel/edge-config'
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

/**
 * Vercel Edge Config を使ったメンテナンスモード
 * Edge Config の isInMaintenanceMode が true の場合、/maintenance にリライトする
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

      if (isInMaintenanceMode) {
        const url = request.nextUrl.clone()
        url.pathname = '/maintenance'
        return NextResponse.rewrite(url)
      }
    } catch (error) {
      // Edge Config が利用できない場合はスキップ
      console.error('Failed to check maintenance mode:', error)
    }

    return next(request, event)
  }
}
