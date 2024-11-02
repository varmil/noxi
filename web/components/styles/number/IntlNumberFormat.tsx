import { PropsWithChildren } from 'react'
import { useFormatter } from 'next-intl'

type Props = {
  minimumSignificantDigits?: number
  maximumSignificantDigits?: number
  maximumFractionDigits?: number
  children: number | bigint
}

export default function IntlNumberFormat({
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const format = useFormatter()

  return (
    <>
      {format.number(children, {
        notation: 'compact',
        ...rest
      })}
    </>
  )
}
