import type { ComponentProps, PropsWithChildren } from 'react'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Header from 'components/header/Header'

type Props = {
  breadcrumb?: ComponentProps<typeof GlobalBreadcrumb>['items']
  className?: string
  noPadding?: boolean
}

/** Page > XS > Xパディング値 */
export const PageXSPX = 'px-4'
/** （注意）Page> XS > Xマージン値 | 基本はpaddingを使う */
export const PageXSMX = 'mx-4'
const PX = `${PageXSPX} sm:px-6`
const PY = 'py-4'

export function Page({
  breadcrumb,
  className,
  children,
  noPadding
}: PropsWithChildren<Props>) {
  const padding = noPadding ? 'px-0 py-4' : `${PX} ${PY}`

  return (
    <section className="sm:space-y-4">
      <Header />

      {breadcrumb && <GlobalBreadcrumb items={breadcrumb} />}

      <main className={`container min-h-screen ${padding} ${className ?? ''}`}>
        {children}
      </main>
    </section>
  )
}
