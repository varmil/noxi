import { SuperXXXDetails } from './SuperXXXDetails'

export class SuperChatDetails extends SuperXXXDetails {
  public readonly userComment: string

  constructor(
    args: ConstructorParameters<typeof SuperXXXDetails>[0] & {
      userComment: string
    }
  ) {
    super(args)
    this.userComment = args.userComment
  }
}
