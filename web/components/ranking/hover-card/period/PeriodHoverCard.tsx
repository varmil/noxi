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
  updatedAt?: dayjs.ConfigType
  criteriaDescription: string
}

export default function PeriodHoverCard({
  start,
  end,
  updatedAt,
  criteriaDescription
}: Props) {
  const t = useTranslations('Components.ranking.hoverCard')

  return (
    <Popover>
      <PopoverTrigger tabIndex={0} className="cursor-pointer">
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-muted-foreground">{t('lastUpdated')}</span>
          <PopoverDate date={dayjs()} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="text-sm space-y-4 font-normal">
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

          {updatedAt ? (
            <Item>
              <ItemTitle>{t('updatedAt')}</ItemTitle>
              <ItemDescription>
                <Datetime date={dayjs(updatedAt).toDate()} />
              </ItemDescription>
            </Item>
          ) : null}

          <Item>
            <ItemTitle>{t('criteria')}</ItemTitle>
            <ItemDescription>{criteriaDescription}</ItemDescription>
          </Item>
        </Items>
      </PopoverContent>
    </Popover>
  )
}
