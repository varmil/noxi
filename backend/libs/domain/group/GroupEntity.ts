import { Transform } from 'class-transformer'
import { GroupIconSrc } from './GroupIconSrc.vo'
import { GroupId } from './GroupId.vo'
import { GroupName } from './GroupName.vo'

export class GroupEntity {
  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly id: GroupId
  @Transform(({ value }: { value: GroupName }) => value.get())
  public readonly name: GroupName
  @Transform(({ value }: { value: GroupIconSrc }) => value.get())
  public readonly iconSrc: GroupIconSrc

  constructor(args: { id: GroupId; name: GroupName; iconSrc: GroupIconSrc }) {
    this.id = args.id
    this.name = args.name
    this.iconSrc = args.iconSrc
  }
}
