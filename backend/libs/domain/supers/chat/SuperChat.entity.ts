import { Transform } from 'class-transformer'
import { Supers } from '@domain/supers/base/Supers'
import { UserComment } from './UserComment.vo'

export class SuperChat extends Supers {
  @Transform(({ value }: { value: UserComment }) => value.get())
  public readonly userComment: UserComment

  constructor(
    args: ConstructorParameters<typeof Supers>[0] & {
      userComment: UserComment
    }
  ) {
    super(args)
    this.userComment = args.userComment
  }
}
