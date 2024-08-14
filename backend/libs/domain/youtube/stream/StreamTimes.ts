import { Exclude } from 'class-transformer'
import {
  StreamStatusEnded,
  StreamStatusLive,
  StreamStatusScheduled
} from '@domain/stream'

export class StreamTimes {
  public readonly scheduledStartTime: Date
  public readonly actualStartTime?: Date
  public readonly actualEndTime?: Date

  constructor(args: {
    scheduledStartTime: Date
    actualStartTime?: Date
    actualEndTime?: Date
  }) {
    this.scheduledStartTime = args.scheduledStartTime
    this.actualStartTime = args.actualStartTime
    this.actualEndTime = args.actualEndTime
  }

  get streamStatus() {
    if (this.actualEndTime) {
      return StreamStatusEnded
    }
    if (this.actualStartTime) {
      return StreamStatusLive
    }
    return StreamStatusScheduled
  }

  /**
   * actualEndTimeを現在時刻で埋める
   * @returns StreamTimes
   */
  @Exclude()
  end() {
    return new StreamTimes({
      scheduledStartTime: this.scheduledStartTime,
      actualStartTime: this.actualStartTime,
      actualEndTime: new Date()
    })
  }
}
