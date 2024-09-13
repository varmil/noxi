import { PropsWithChildren, ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { CookieAgreeBanner } from 'app/[locale]/(end-user)/(default)/_components/CookieAgreeBanner'
import Aside from 'components/aside/Aside'
import { GroupString } from 'config/constants/Site'
import { isTheaterMode } from 'lib/isTheaterMode'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: { locale: string; group: GroupString }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

// TODO:
// ルートグループ使う
// /youtube/live/[videoId] vs. Others で分けるイメージ
// (end-user) > (default)
// (end-user) > (no-layout) > /youtube/live/[videoId]

// TODO:
// このファイルの処理はtemplate内で行うのが良いか（SearchParams取れるかチェック）
// https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#templates
export default async function LocaleLayout({
  children,
  params: { locale, group },
  searchParams
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  console.log('searchParams', searchParams)

  // theater mode の判定をここに直書き（ちょっと気持ち悪い）
  if (isTheaterMode(searchParams)) {
    return <TheaterLayout>{children}</TheaterLayout>
  }

  return <DefaultLayout>{children}</DefaultLayout>
}

// TODO: components/layouts へ移動
async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16 bg-muted/40">
        {children}
      </div>
      <CookieAgreeBanner />
    </>
  )
}

// TODO: components/layouts へ移動
async function TheaterLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
