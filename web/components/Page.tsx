import type { ComponentProps, PropsWithChildren } from 'react'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Header from './Header'

type Props = {
  breadcrumb?: ComponentProps<typeof GlobalBreadcrumb>['items']
}

export default function Page({
  breadcrumb,
  children
}: PropsWithChildren<Props>) {
  return (
    <>
      <Header />
      {breadcrumb && <GlobalBreadcrumb items={breadcrumb} />}
      {children}
    </>
  )
}
