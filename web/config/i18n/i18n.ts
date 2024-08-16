import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from 'config/i18n/locale'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default,

    // The time zone can either be statically defined, read from the
    // user profile if you store such a setting, or based on dynamic
    // request information like the locale or a cookie.
    timeZone: 'Asia/Tokyo'
  }
})
