export class LiveStreamingDetails {
  public readonly actualStartTime?: Date
  public readonly actualEndTime?: Date
  public readonly concurrentViewers?: number

  constructor(args: {
    actualStartTime?: Date
    actualEndTime?: Date
    concurrentViewers?: number
  }) {
    this.actualStartTime = args.actualStartTime
    this.actualEndTime = args.actualEndTime
    this.concurrentViewers = args.concurrentViewers
  }
}
