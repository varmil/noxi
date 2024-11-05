import type { ComponentProps, PropsWithChildren } from 'react'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Header from 'components/header/Header'

type Props = {
  breadcrumb?: ComponentProps<typeof GlobalBreadcrumb>['items']
  /** Class that will be applied to the main tag */
  className?: string
  /** Remove X padding, Y padding is still applied */
  noPadding?: boolean
  /** If true, the width will not be limited */
  fullWidth?: boolean
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
  noPadding,
  fullWidth
}: PropsWithChildren<Props>) {
  const padding = noPadding ? 'px-0 py-4' : `${PX} ${PY}`
  const containerClass = fullWidth ? 'w-full mx-auto' : 'container'

  return (
    <section className="sm:space-y-4">
      <Header />

      {breadcrumb && <GlobalBreadcrumb items={breadcrumb} />}

      <main
        className={`relative z-0 ${containerClass} min-h-screen ${padding} ${
          className ?? ''
        }`}
      >
        {children}
      </main>
    </section>
  )
}
