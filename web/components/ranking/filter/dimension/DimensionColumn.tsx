import { PropsWithoutRef } from 'react'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'dimension'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function DimensionColumn({ className }: Props) {
  return (
    <Column>
      <ColumnHeader>ディメンション</ColumnHeader>
      <ColumnContent>
        <SelectButton qsKey={QS_KEY} qsValue="concurrent-viewer">
          同時視聴者数
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="super-chat">
          スパチャ金額
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
