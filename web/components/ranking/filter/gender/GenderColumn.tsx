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

export default function GenderColumn() {
  const tg = useTranslations('Global')
  return (
    <Column>
      <ColumnHeader>{tg('ranking.filter.gender')}</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qs={{ [QS_KEY]: null, ...RESET_KEYS }}
          activeVariant="secondary"
          prefetch={false}
        >
          {tg('gender.all')}
        </SelectButton>
        <SelectButton
          qs={{ [QS_KEY]: 'male', ...RESET_KEYS }}
          activeVariant="secondary"
          prefetch={false}
        >
          {tg('gender.male')}
        </SelectButton>
        <SelectButton
          qs={{ [QS_KEY]: 'female', ...RESET_KEYS }}
          activeVariant="secondary"
          prefetch={false}
        >
          {tg('gender.female')}
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
