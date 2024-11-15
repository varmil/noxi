import Image from 'components/styles/Image'
import { getDailySupersRanking } from 'features/supers-ranking/utils/getSupersRanking'
import dayjs from 'lib/dayjs'

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
    <div className="flex gap-x-20 w-full h-full p-10 bg-accent rounded-lg">
      <section className="flex flex-col items-center justify-between w-[330px] text-4xl font-bold">
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
      </section>
      <section className="flex-1 flex flex-col gap-5">
        {ranking.map((e, i) => (
          <div key={i} className="flex flex-row items-center gap-5">
            <div className="flex text-xl font-extrabold">{e.rank}位</div>

            <div className="flex w-[100px] h-[100px] justify-center items-center rounded-full overflow-hidden">
              <Image
                src={e.channelThumbnails ?? ''}
                alt={e.channelTitle}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col font-bold">
              <div className="flex text-2xl">{e.channelTitle}</div>
              <div className="flex text-lg">{e.amount} 円 / 日</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
