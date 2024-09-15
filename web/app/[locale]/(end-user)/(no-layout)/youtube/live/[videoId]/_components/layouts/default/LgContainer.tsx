import { PropsWithChildren } from 'react'

/** LG以上のブレークポイントでシンプルな２カラムを表現するために使用する */
export default function LgContainer({
  className,
  children
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`contents lg:block ${className ?? ''}`}>
      {children}
    </section>
  )
}
