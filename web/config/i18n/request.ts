import { headers } from 'next/headers'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from 'config/i18n/routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

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

  return (await headers()).get('x-vercel-ip-timezone') ?? undefined
}
