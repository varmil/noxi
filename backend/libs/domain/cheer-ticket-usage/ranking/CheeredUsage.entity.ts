import { Transform } from 'class-transformer'
import { UsedCount } from '@domain/cheer-ticket-usage'
import { ChannelId } from '@domain/youtube'

/** 応援された側の量を表す */
export class CheeredUsage {
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: UsedCount }) => value.get())
  public readonly usedCount: UsedCount

  constructor(args: { channelId: ChannelId; usedCount: UsedCount }) {
    this.channelId = args.channelId
    this.usedCount = args.usedCount
  }
}
