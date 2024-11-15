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
          <div className="text-5xl">日刊</div>
          <div className="text-3xl self-end">
            {formatter.format(dayjs(date).toDate())}
          </div>
        </div>

        <div className="text-center">
          <div className="text-8xl">スパチャ</div>
          <div className="text-6xl">ランキング</div>
        </div>
        <div className="text-xs">※PeakX登録タレント集計。ステッカー含む</div>
      </HeadlineContainer>
      <RankingContainer>
        {ranking.map((e, i) => (
          <div key={i} className="flex flex-row items-center gap-5">
            <div className="flex text-xl font-extrabold">{e.rank}位</div>

            <Link href={`/${e.group}/channels/${e.channelId}`}>
              <Avatar className="w-9 h-9 sm:w-24 sm:h-24 transition-all hover:scale-105">
                <AvatarImage src={e.channelThumbnails} alt={e.channelTitle} />
              </Avatar>
            </Link>

            <div className="flex flex-col font-bold">
              <div className="flex text-2xl">
                <Link href={`/${e.group}/channels/${e.channelId}`}>
                  {e.channelTitle}
                </Link>
              </div>
              <div className="flex text-lg">{e.amount} 円 / 日</div>
            </div>
          </div>
        ))}
      </RankingContainer>
    </Container>
  )
}

const Container = (props: PropsWithChildren) => {
  return (
    <div className="flex gap-x-20 w-full h-full p-10 bg-accent rounded-lg">
      {props.children}
    </div>
  )
}
const HeadlineContainer = (props: PropsWithChildren) => {
  return (
    <section className="flex flex-col items-center justify-between w-[330px] text-4xl font-bold">
      {props.children}
    </section>
  )
}
const RankingContainer = (props: PropsWithChildren) => {
  return (
    <section className="flex-1 flex flex-col gap-5">{props.children}</section>
  )
}
