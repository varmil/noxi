import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from 'config/i18n/routing'
import { MiddlewareFactory } from 'lib/middleware/MiddlewareFactory'

const locales = routing.locales
const defaultLocale = routing.defaultLocale

/**
 * localeがpathnameに含まれていない場合に判別するロジック
 *
 * Cookieから今設定されているLocaleを読み出して、
 * それがない場合はブラウザのAccept-Languageヘッダーを元に判断する
 */
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as
    | (typeof locales)[number]
    | undefined
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(languages, locales, defaultLocale)
}

export const withIntl: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl

    // ロケール無しの /auth/* をリダイレクト
    if (
      pathname === '/auth/signin' ||
      pathname === '/auth/error' ||
      pathname === '/auth/verify-request'
    ) {
      const locale = getLocale(request)
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}${pathname}`
      return NextResponse.redirect(url)
    }

    const handleI18nRouting = createMiddleware(routing)
    return handleI18nRouting(request)
  }
}
