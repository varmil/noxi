import { UserComment } from '@domain/super-xxx'
import { SuperXXXDetails } from './SuperXXXDetails'

export class SuperChatDetails extends SuperXXXDetails {
  public readonly userComment: UserComment

  constructor(
    args: ConstructorParameters<typeof SuperXXXDetails>[0] & {
      userComment: UserComment
    }
  ) {
    super(args)
    this.userComment = args.userComment
  }
}
