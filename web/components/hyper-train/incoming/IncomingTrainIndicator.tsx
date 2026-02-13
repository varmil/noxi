import { getHyperTrainIncomingStatus } from 'apis/hyper-trains/getHyperTrains'
import { CooldownIndicator } from 'components/hyper-train/incoming/CooldownIndicator'

type Props = {
  channelId: string
}

export async function IncomingTrainIndicator({ channelId }: Props) {
  const [{ cooldownEndsAt }] = await Promise.all([
    getHyperTrainIncomingStatus(channelId)
  ])

  if (cooldownEndsAt) {
    return <CooldownIndicator cooldownEndsAt={cooldownEndsAt} />
  }

  return null

  /** @deprecated 2026/02/14： 発車のワクワク感がなくなるので使わない方向 */
  // const lamps = Array.from({ length: TRAIN_TRIGGER_UNIQUE_USERS }, (_, i) => i)
  // return (
  //   <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
  //     <div className="flex items-center gap-1.5">
  //       {lamps.map(i => (
  //         <div
  //           key={i}
  //           className={`size-3 rounded-full transition-colors ${
  //             i < uniqueUserCount
  //               ? 'bg-yellow-400 shadow-sm shadow-yellow-400/50'
  //               : 'bg-muted-foreground/20'
  //           }`}
  //         />
  //       ))}
  //     </div>
  //     <span className="text-xs text-muted-foreground">
  //       {t('description', {
  //         remaining: TRAIN_TRIGGER_UNIQUE_USERS - uniqueUserCount
  //       })}
  //     </span>
  //   </div>
  // )
}
