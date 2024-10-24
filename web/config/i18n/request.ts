import { headers, type UnsafeUnwrappedHeaders } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { routing } from 'config/i18n/routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    /** set server timezone which is used in formatting */
    timeZone: await getTimezone()
  }
})

async function getTimezone() {
  // In Local, use 'Asia/Tokyo'
  if (process.env.NODE_ENV === 'development') {
    return 'Asia/Tokyo'
  }

  return (
    ((await headers()) as unknown as UnsafeUnwrappedHeaders).get(
      'x-vercel-ip-timezone'
    ) ?? undefined
  )
}
