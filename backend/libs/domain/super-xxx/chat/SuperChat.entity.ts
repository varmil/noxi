import { SuperXXX } from '@domain/super-xxx/base/SuperXXX'
import { UserComment } from './UserComment.vo'

export class SuperChat extends SuperXXX {
  public readonly userComment: UserComment

  constructor(
    args: ConstructorParameters<typeof SuperXXX>[0] & {
      userComment: UserComment
    }
  ) {
    super(args)
    this.userComment = args.userComment
  }
}
