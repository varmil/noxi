import { useTranslations } from 'next-intl'
import { RankingPeriod } from 'types/ranking'
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

type Props = {
  start: dayjs.ConfigType
  end: dayjs.ConfigType
  date?: string | Date
}

export default function PeriodHoverCard({ start, end, date }: Props) {
  const t = useTranslations('Features.channelsRanking.hoverCard')

  return (
    <Popover>
      <PopoverTrigger tabIndex={0}>
        <PopoverDate date={start} />
        <PopoverDate date={end} />
      </PopoverTrigger>
      <PopoverContent className="space-y-4 font-normal">
        <Title>{t('title')}</Title>

        <Items>
          <Item>
            <ItemTitle>{t('period')}</ItemTitle>
            <DatetimeContainer>
              <div className="text-muted-foreground">{t('start')}</div>
              <Datetime date={dayjs(start).toDate()} />
              <div className="text-muted-foreground">{t('end')}</div>
              <Datetime date={dayjs(end).toDate()} />
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
