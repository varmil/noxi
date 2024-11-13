import { Exclude, Transform } from 'class-transformer'
import {
  StreamStatusEnded,
  StreamStatusLive,
  StreamStatusScheduled
} from '@domain/stream'
import { ActualEndTime, ActualStartTime } from '@domain/youtube'

export class StreamTimes {
  public readonly scheduledStartTime: Date
  @Transform(({ value }: { value?: ActualStartTime }) => value?.get())
  public readonly actualStartTime?: ActualStartTime
  @Transform(({ value }: { value?: ActualEndTime }) => value?.get())
  public readonly actualEndTime?: ActualEndTime

  constructor(args: {
    scheduledStartTime: Date
    actualStartTime?: ActualStartTime
    actualEndTime?: ActualEndTime
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
      actualEndTime: new ActualEndTime(new Date())
    })
  }
}
