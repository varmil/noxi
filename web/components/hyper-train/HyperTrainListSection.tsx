import { getTranslations } from 'next-intl/server'
import { Separator } from '@/components/ui/separator'
import { getActiveHyperTrains } from 'apis/hyper-trains/getHyperTrains'
import { getChannels } from 'apis/youtube/getChannels'
import { HyperTrainCard } from 'components/hyper-train/HyperTrainCard'

export async function HyperTrainListSection() {
  const [trains, t] = await Promise.all([
    getActiveHyperTrains(),
    getTranslations('Features.hyperTrain.listSection')
  ])
  if (trains.length === 0) return null

  const channels = await getChannels({
    ids: trains.map(train => train.channelId),
    limit: trains.length
  })
  const channelMap = new Map(
    channels.map(ch => [ch.basicInfo.id, ch.basicInfo])
  )

  return (
    <>
      <Separator className="my-4" />
      <section className="col-span-full">
        <h2 className="text-lg font-semibold mb-3">{t('title')}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trains.map(train => {
            const channel = channelMap.get(train.channelId)
            if (!channel) {
              throw new Error(
                `Channel not found for channelId: ${train.channelId}`
              )
            }
            return (
              <HyperTrainCard
                key={train.id}
                train={train}
                channelTitle={channel.title}
                channelThumbnailUrl={channel.thumbnails.medium?.url}
                href={`/${train.group}/channels/${train.channelId}/hyper-chat`}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
