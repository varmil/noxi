import type { ComponentProps, PropsWithChildren } from 'react'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Header from 'components/header/Header'

type Props = {
  breadcrumb?: ComponentProps<typeof GlobalBreadcrumb>['items']
  /** The H1 text that will be displayed in the header */
  h1?: string
  /** Class that will be applied to the main tag */
  className?: string
  /** Remove X padding, Y padding is still applied */
  noPadding?: boolean
  /** If true, the width will not be limited */
  fullWidth?: boolean
}

/** Page > XS > Xパディング値 */
export const PageXSPX = 'px-4'
/** Page > SM > Xパディング値 */
export const PageSMPX = 'sm:px-6'

/** （注意）Page> XS > Xマージン値 | 基本はpaddingを使う */
export const PageXSMX = 'mx-4'

export function Page({
  breadcrumb,
  h1,
  className,
  children,
  noPadding,
  fullWidth
}: PropsWithChildren<Props>) {
  const padding = noPadding ? 'px-0' : `${PageXSPX} ${PageSMPX}`
  const containerClass = fullWidth ? 'w-full mx-auto' : 'container'

  return (
    <section className="space-y-4">
      <Header className="z-30" />

      {breadcrumb && <GlobalBreadcrumb items={breadcrumb} />}

      {h1 && (
        <div
          className={`z-0 text-xl bg-muted text-muted-foreground py-6 ${padding}`}
        >
          <h1 className="font-bold">{h1}</h1>
        </div>
      )}

      <main
        role="main"
        className={`relative z-0 ${containerClass} min-h-[80vh] ${padding} ${
          className ?? ''
        }`}
      >
        {children}
      </main>
    </section>
  )
}
