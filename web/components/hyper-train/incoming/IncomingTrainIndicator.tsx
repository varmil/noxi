import { getTranslations } from 'next-intl/server'
import { getHyperTrainIncomingStatus } from 'apis/hyper-trains/getHyperTrains'
import { CooldownIndicator } from 'components/hyper-train/incoming/CooldownIndicator'
import { TRAIN_TRIGGER_UNIQUE_USERS } from 'utils/hyper-train/level-config'

type Props = {
  channelId: string
}

export async function IncomingTrainIndicator({ channelId }: Props) {
  const [{ uniqueUserCount, cooldownEndsAt }, t] = await Promise.all([
    getHyperTrainIncomingStatus(channelId),
    getTranslations('Features.hyperTrain.incoming')
  ])

  if (cooldownEndsAt) {
    return <CooldownIndicator cooldownEndsAt={cooldownEndsAt} />
  }

  if (uniqueUserCount === 0) return null

  const lamps = Array.from({ length: TRAIN_TRIGGER_UNIQUE_USERS }, (_, i) => i)

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
      <div className="flex items-center gap-1.5">
        {lamps.map(i => (
          <div
            key={i}
            className={`size-3 rounded-full transition-colors ${
              i < uniqueUserCount
                ? 'bg-yellow-400 shadow-sm shadow-yellow-400/50'
                : 'bg-muted-foreground/20'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {t('description', {
          remaining: TRAIN_TRIGGER_UNIQUE_USERS - uniqueUserCount
        })}
      </span>
    </div>
  )
}
