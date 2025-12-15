import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'country'

const RESET_KEYS = {
  page: null
}

export default function SeasonColumn() {
  const global = useTranslations('Global.ranking')
  const comp = useTranslations('Components.ranking.filter.season')
  return (
    <Column>
      <ColumnHeader>{global('filter.season')}</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qs={{ [QS_KEY]: null, ...RESET_KEYS }}
          activeVariant="secondary"
          prefetch={false}
        >
          {comp('test001')}
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
