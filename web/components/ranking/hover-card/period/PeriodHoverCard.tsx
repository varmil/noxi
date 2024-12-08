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

type Props = {
  start: dayjs.ConfigType
  end: dayjs.ConfigType
}

export default function PeriodHoverCard({ start, end }: Props) {
  const t = useTranslations('Features.channelsRanking.hoverCard')

  return (
    <Popover>
      <PopoverTrigger tabIndex={0}>
        {/* 24時間以内の場合はendのみ表示する */}
        {isWithin24Hours(start, end) ? (
          <PopoverDate date={end} />
        ) : (
          <div className="flex gap-2">
            <PopoverDate date={start} />
            <PopoverDate date={end} />
          </div>
        )}
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

// 差分が24時間以内かを判定
function isWithin24Hours(
  start: dayjs.ConfigType,
  end: dayjs.ConfigType
): boolean {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  return Math.abs(endDate.diff(startDate, 'hour')) <= 24
}
