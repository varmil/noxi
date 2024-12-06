import { ComponentProps } from 'react'
import { TableCell } from '@/components/ui/table'
import CountryFlag from 'components/styles/CountryFlag'

export default function TableCellOfCountry({
  countryCode
}: {
  countryCode?: string
}) {
  return (
    <TableCell width={50} className="hidden @3xl:table-cell">
      <CountryFlag className="m-auto" countryCode={countryCode} size={24} />
    </TableCell>
  )
}
