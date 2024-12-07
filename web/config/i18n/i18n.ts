import { headers, type UnsafeUnwrappedHeaders } from 'next/headers';
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from 'config/i18n/locale'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    /** set server timezone which is used in formatting */
    timeZone: getTimezone()
  }
})

function getTimezone() {
  // In Local, use 'Asia/Tokyo'
  if (process.env.NODE_ENV === 'development') {
    return 'Asia/Tokyo'
  }

  return (headers() as unknown as UnsafeUnwrappedHeaders).get('x-vercel-ip-timezone') ?? undefined;
}
