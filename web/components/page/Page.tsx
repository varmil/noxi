import type { ComponentProps, PropsWithChildren } from 'react'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Header from 'components/header/Header'

type Props = {
  breadcrumb?: ComponentProps<typeof GlobalBreadcrumb>['items']
}

export function Page({ breadcrumb, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Header />
      {breadcrumb && <GlobalBreadcrumb items={breadcrumb} />}

      <main className="container min-h-screen p-4 sm:px-6">{children}</main>
    </>
  )
}
