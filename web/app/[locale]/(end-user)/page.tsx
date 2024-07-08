import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Page from 'components/Page'
import Site from 'config/constants/Site'
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
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">
                PeakX（ピークX）へようこそ
              </h2>
              <p className="mt-3 text-muted-foreground">
                私たちは世界中（まずは日本から始めます！）のインフルエンサーの情報を整理整頓します。
                それらの情報をユーザーの興味に沿う形に最適化して提供し続けることを使命としています。
                Youtube, Twitch, Tiktok,
                Instagramを含むインフルエンサーをご紹介します。
              </p>
            </div>
          </div>

          <section className="container px-0 py-24">
            <h2 className="text-3xl font-bold lg:text-4xl">
              キーワードでチャンネルを探す
            </h2>
            <div className="mt-3">
              <IconSectionSolidIconWithHoverEffect />
            </div>
          </section>
        </div>
      </div>
    </Page>
  )
}
