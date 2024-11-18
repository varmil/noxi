import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import DailyHoverCard from 'features/supers-ranking/components/styles/DailyHoverCard'
import { getDailySupersRanking } from 'features/supers-ranking/utils/getSupersRanking'
import { Link } from 'lib/navigation'

type Props = {
  date?: string
}

export default async function SupersRankingHero({ date }: Props) {
  const t = await getTranslations('Features.supersRanking')
  const ranking = await getDailySupersRanking({ date, limit: 10 })

  return (
    <Container>
      <HeadlineContainer>
        <div className="flex items-center gap-5">
          <div className="text-3xl md:text-4xl">{t('daily')}</div>
          <div className="text-xl md:text-3xl self-end">
            <DailyHoverCard date={date} />
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl md:text-7xl">{t('superChat')}</div>
          <div className="text-4xl md:text-5xl">{t('ranking')}</div>
        </div>
        <div className="text-xs text-muted-foreground">{t('note1')}</div>
      </HeadlineContainer>
      <RankingContainer>
        {ranking.map((e, i) => (
          <div key={i} className="flex flex-row items-center gap-3 md:gap-5">
            <div className="w-7 md:w-9 md:text-xl text-nowrap font-extrabold tabular-nums">
              {t.rich('place', {
                rank: e.rank,
                weak: chunks => <Weak>{chunks}</Weak>
              })}
            </div>

            <Link href={`/${e.group}/channels/${e.channelId}`}>
              <Avatar className="w-9 h-9 sm:w-24 sm:h-24 transition-all hover:scale-105">
                <AvatarImage src={e.channelThumbnails} alt={e.channelTitle} />
              </Avatar>
            </Link>

            <div className="flex flex-1 flex-col">
              <Link
                href={`/${e.group}/channels/${e.channelId}`}
                className="md:text-2xl line-clamp-1 break-anywhere"
              >
                {e.channelTitle}
              </Link>
              <div className="text-base md:text-lg">
                <span className="text-primary font-bold tabular-nums">
                  {e.amount}
                </span>{' '}
                <Weak>{t('yen')}</Weak>
              </div>
            </div>
          </div>
        ))}
      </RankingContainer>
    </Container>
  )
}

const Container = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full h-full p-5 md:p-10 bg-accent rounded-lg">
      {props.children}
    </div>
  )
}

const HeadlineContainer = (props: PropsWithChildren) => {
  return (
    <section className="flex flex-col items-center justify-between lg:w-[330px] lg:max-h-[600px] gap-4 font-bold">
      {props.children}
    </section>
  )
}
const RankingContainer = (props: PropsWithChildren) => {
  return (
    <section className="flex-1 flex flex-col gap-4 md:gap-5">
      {props.children}
    </section>
  )
}
const Weak = ({ children }: PropsWithChildren) => (
  <span className="text-xs md:text-sm text-muted-foreground">{children}</span>
)
