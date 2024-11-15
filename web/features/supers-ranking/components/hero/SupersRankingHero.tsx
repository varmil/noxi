import { PropsWithChildren } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getDailySupersRanking } from 'features/supers-ranking/utils/getSupersRanking'
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

type Props = {
  date?: string
}

export default async function SupersRankingHero({ date }: Props) {
  const ranking = await getDailySupersRanking(date)

  const formatter = Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  })

  return (
    <Container>
      <HeadlineContainer>
        <div className="flex items-center gap-5">
          <div className="text-3xl md:text-5xl">日刊</div>
          <div className="text-xl md:text-3xl self-end">
            {formatter.format(dayjs(date).toDate())}
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl md:text-8xl">スパチャ</div>
          <div className="text-4xl md:text-6xl">ランキング</div>
        </div>
        <div className="text-xs text-muted-foreground">※PeakX登録タレント</div>
      </HeadlineContainer>
      <RankingContainer>
        {ranking.map((e, i) => (
          <div key={i} className="flex flex-row items-center gap-3 md:gap-5">
            <div className="md:text-xl font-extrabold tabular-nums">
              {e.rank}
              <Weak>位</Weak>
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
                <Weak>円 / 日</Weak>
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
    <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full h-full p-5 md:p-10 bg-accent rounded-lg">
      {props.children}
    </div>
  )
}

const HeadlineContainer = (props: PropsWithChildren) => {
  return (
    <section className="flex flex-col items-center justify-between md:w-[330px] gap-4 font-bold">
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
