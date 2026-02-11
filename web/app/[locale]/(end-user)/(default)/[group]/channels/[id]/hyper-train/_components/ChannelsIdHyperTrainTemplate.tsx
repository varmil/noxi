import { Train } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getBestHyperTrain } from 'apis/hyper-trains/getHyperTrains'
import { HyperTrainBestRecord } from 'components/hyper-train/best/HyperTrainBestRecord'

type Props = {
  channelId: string
}

export async function ChannelsIdHyperTrainTemplate({ channelId }: Props) {
  const [bestTrain, t] = await Promise.all([
    getBestHyperTrain(channelId),
    getTranslations('Features.hyperTrain.bestRecord')
  ])

  if (!bestTrain) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Train className="size-12 mb-4 opacity-50" />
        <p className="text-sm px-6">{t('empty')}</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <HyperTrainBestRecord train={bestTrain} />
    </div>
  )
}
