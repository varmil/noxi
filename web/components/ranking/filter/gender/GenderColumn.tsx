import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'gender'

const RESET_KEYS = {
  page: null
}

type Props = PropsWithoutRef<{
  className?: string
}>

export default function GenderColumn({ className }: Props) {
  const tg = useTranslations('Global')
  return (
    <Column>
      <ColumnHeader>{tg('ranking.filter.gender')}</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qs={{ [QS_KEY]: null, ...RESET_KEYS }}
          activeVariant="secondary"
        >
          {tg('gender.all')}
        </SelectButton>
        <SelectButton
          qs={{ [QS_KEY]: 'male', ...RESET_KEYS }}
          activeVariant="secondary"
        >
          {tg('gender.male')}
        </SelectButton>
        <SelectButton
          qs={{ [QS_KEY]: 'female', ...RESET_KEYS }}
          activeVariant="secondary"
        >
          {tg('gender.female')}
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
