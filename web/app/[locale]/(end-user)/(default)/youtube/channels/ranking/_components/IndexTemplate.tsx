import { PropsWithoutRef } from 'react'
import SupersRankingHero from 'features/channels-ranking/components/hero/SupersRankingHero'

type Props = {
  date?: string
}

export default function IndexTemplate({ date }: PropsWithoutRef<Props>) {
  return (
    <section className="flex flex-col gap-y-10 max-w-6xl mx-auto">
      <SupersRankingHero date={date} />
    </section>
  )
}
