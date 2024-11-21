import { PropsWithoutRef } from 'react'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'country'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function CountryColumn({ className }: Props) {
  return (
    <Column>
      <ColumnHeader>国</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="worldwide"
          activeVariant="secondary"
          defaultActive
        >
          🌐 全世界
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="jp" activeVariant="secondary">
          🇯🇵 日本
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="kr" activeVariant="secondary">
          🇰🇷 韓国
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="tw" activeVariant="secondary">
          🇹🇼 台湾
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="us" activeVariant="secondary">
          🇺🇸 アメリカ
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
