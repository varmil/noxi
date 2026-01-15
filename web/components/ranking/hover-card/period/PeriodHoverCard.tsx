import { useFormatter, useTranslations } from 'next-intl'
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
  const format = useFormatter()

  const formatDate = (date: dayjs.ConfigType) =>
    format.dateTime(dayjs(date).toDate(), {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

  return (
    <>
      {/* SEO用の非表示テキスト */}
      <span className="sr-only">
        {t('period')}: {formatDate(start)} - {formatDate(end)}, {t('criteria')}:{' '}
        {criteriaDescription}
      </span>

      <Popover>
        <PopoverTrigger tabIndex={0} className="cursor-pointer">
          <div className="flex items-center gap-1.5 text-sm whitespace-nowrap">
            <span className="text-muted-foreground">{t('lastUpdated')}</span>
            <PopoverDate date={updatedAt ?? end} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="text-sm space-y-4 font-normal">
          <Title>{t('title')}</Title>

          <Items>
            <Item>
              <ItemTitle>{t('period')}</ItemTitle>
              <DatetimeContainer>
                <div className="text-muted-foreground">{t('start')}</div>
                <Datetime date={start} />
                <div className="text-muted-foreground">{t('end')}</div>
                <Datetime date={end} />
              </DatetimeContainer>
            </Item>

            {updatedAt ? (
              <Item>
                <ItemTitle>{t('updatedAt')}</ItemTitle>
                <ItemDescription>
                  <Datetime date={updatedAt} />
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
    </>
  )
}
