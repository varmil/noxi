import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
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
  const tg = useTranslations('Global.ranking')
  return (
    <Column>
      <ColumnHeader>{tg('filter.country')}</ColumnHeader>
      <ColumnContent>
        <SelectButton qs={{ [QS_KEY]: null }} activeVariant="secondary">
          🌐 {tg('country.all')}
        </SelectButton>
        {/* <SelectButton qs={{ [QS_KEY]: 'jp' }} activeVariant="secondary">
          🇯🇵 日本
        </SelectButton>
        <SelectButton qs={{ [QS_KEY]: 'kr' }} activeVariant="secondary">
          🇰🇷 韓国
        </SelectButton>
        <SelectButton qs={{ [QS_KEY]: 'tw' }} activeVariant="secondary">
          🇹🇼 台湾
        </SelectButton>
        <SelectButton qs={{ [QS_KEY]: 'us' }} activeVariant="secondary">
          🇺🇸 アメリカ
        </SelectButton> */}
      </ColumnContent>
    </Column>
  )
}
