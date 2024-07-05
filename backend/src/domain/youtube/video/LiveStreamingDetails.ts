export class LiveStreamingDetails {
  public readonly actualStartTime: Date
  public readonly actualEndTime: Date

  constructor(args: { actualStartTime: Date; actualEndTime: Date }) {
    this.actualStartTime = args.actualStartTime
    this.actualEndTime = args.actualEndTime
  }
}
