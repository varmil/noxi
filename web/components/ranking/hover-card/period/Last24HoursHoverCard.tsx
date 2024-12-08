import { useTranslations } from 'next-intl'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Items,
  ItemTitle,
  DatetimeContainer,
  Datetime,
  ItemDescription,
  PopoverDate,
  Item,
  Title
} from 'components/ranking/hover-card/base/RankingHoverCard'
import dayjs from 'lib/dayjs'

const getActualEndTimeGTE = (date: dayjs.ConfigType) =>
  dayjs(date).subtract(1, 'day').toDate()

const getActualEndTimeLTE = (date: dayjs.ConfigType) => dayjs(date).toDate()

type Props = {
  date?: string | Date
}

/** これだけ日時集計で幅がないので特別扱い */
export default function Last24HoursHoverCard({ date }: Props) {
  const t = useTranslations('Features.channelsRanking.hoverCard')
  const gte = getActualEndTimeGTE(date)
  const lte = getActualEndTimeLTE(date)

  return (
    <Popover>
      <PopoverTrigger tabIndex={0}>
        <PopoverDate date={date} />
      </PopoverTrigger>
      <PopoverContent className="space-y-4 font-normal">
        <Title>{t('title')}</Title>

        <Items>
          <Item>
            <ItemTitle>{t('period')}</ItemTitle>
            <DatetimeContainer>
              <div className="text-muted-foreground">{t('start')}</div>
              <Datetime date={gte} />
              <div className="text-muted-foreground">{t('end')}</div>
              <Datetime date={lte} />
            </DatetimeContainer>
          </Item>

          <Item>
            <ItemTitle>{t('criteria')}</ItemTitle>
            <ItemDescription>{t('criteriaDescription')}</ItemDescription>
          </Item>
        </Items>
      </PopoverContent>
    </Popover>
  )
}
