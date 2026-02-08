import { Transform } from 'class-transformer'
import { Granted } from './Granted.vo'
import { LoginCount } from './LoginCount.vo'
import { ProgressIncremented } from './ProgressIncremented.vo'

export class HyperChatTicketProgress {
  @Transform(({ value }: { value: Granted }) => value.get())
  public readonly granted: Granted

  @Transform(({ value }: { value: LoginCount }) => value.get())
  public readonly currentCount: LoginCount

  @Transform(({ value }: { value: ProgressIncremented }) => value.get())
  public readonly progressIncremented: ProgressIncremented

  constructor(args: {
    granted: Granted
    currentCount: LoginCount
    progressIncremented: ProgressIncremented
  }) {
    this.granted = args.granted
    this.currentCount = args.currentCount
    this.progressIncremented = args.progressIncremented
  }
}
