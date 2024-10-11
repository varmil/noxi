import { PropsWithChildren } from 'react'
import { PageXSPX } from 'components/page'

/** paddingなしページなので個別にpadding必要な場所はセット */
export default function PadSection({
  className,
  children,
  left,
  right
}: PropsWithChildren<{
  className?: string
  /** 2カラム表示時：左カラム */
  left?: boolean
  /** 2カラム表示時：右カラム */
  right?: boolean
}>) {
  const LG_LEFT_PX = '@4xl:pl-4 @4xl:pr-2'
  const LG_RIGHT_PX = '@4xl:pr-4 @4xl:pl-2'
  return (
    <section
      className={`flex flex-col ${PageXSPX} ${left ? LG_LEFT_PX : ''} ${
        right ? LG_RIGHT_PX : ''
      } ${className ?? ''}`}
    >
      {children}
    </section>
  )
}
