import { Metadata } from 'next'
import Page from 'components/Page'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import { YoutubeDashboard } from 'features/youtube/YoutubeDashboard'
import Site from 'config/constants/Site'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import IconSectionSolidIconWithHoverEffect from 'features/icon-section/IconSectionSolidIconWithHoverEffect'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'IndexPage' })

  return {
    title: `チャンネル | ${Site.TITLE}`,
    description: `チャンネル | ${Site.TITLE}`
  }
}

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <Page>
      <GlobalBreadcrumb
        items={[
          { href: '#', name: 'Home' },
          { href: '#', name: 'Youtube' }
        ]}
      />
      <div className="container py-24 lg:py-32">
        <div className="max-w-2xl mx-auto">
          {/* Grid */}
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">
                PeakX（ピークX）へようこそ
              </h2>
              <p className="mt-3 text-muted-foreground">
                For as long as there have been cities, the public square has
                been a fundamental part of the urban landscape - an open,
                approachable space to meet and engage with friends and
                neighbours. Space aims to capture this spirit of bringing people
                together in an exciting, welcoming environment.
              </p>
            </div>
          </div>

          <IconSectionSolidIconWithHoverEffect />
        </div>
      </div>
    </Page>
  )
}
