import { Transform, Exclude } from 'class-transformer'
import { GroupIconSrc } from './GroupIconSrc.vo'
import { GroupId } from './GroupId.vo'
import { GroupName } from './GroupName.vo'
import { GroupRegistrationAppliedAt } from './GroupRegistrationAppliedAt.vo'
import { GroupRegistrationId } from './GroupRegistrationId.vo'
import { GroupRegistrationStatus } from './GroupRegistrationStatus.vo'

export class GroupRegistration {
  @Transform(({ value }: { value: GroupRegistrationId }) => value.get())
  public readonly id: GroupRegistrationId
  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly groupId: GroupId
  @Transform(({ value }: { value: GroupName }) => value.get())
  public readonly name: GroupName
  @Transform(({ value }: { value: GroupIconSrc }) => value.get())
  public readonly iconSrc: GroupIconSrc
  @Transform(({ value }: { value: GroupRegistrationStatus }) => value.get())
  public readonly status: GroupRegistrationStatus
  @Transform(({ value }: { value: GroupRegistrationAppliedAt }) => value.get())
  public readonly appliedAt: GroupRegistrationAppliedAt

  constructor(args: {
    id: GroupRegistrationId
    groupId: GroupId
    name: GroupName
    iconSrc: GroupIconSrc
    status: GroupRegistrationStatus
    appliedAt: GroupRegistrationAppliedAt
  }) {
    this.id = args.id
    this.groupId = args.groupId
    this.name = args.name
    this.iconSrc = args.iconSrc
    this.status = args.status
    this.appliedAt = args.appliedAt
  }

  @Exclude()
  isPending(): boolean {
    return this.status.get() === 'pending'
  }

  @Exclude()
  isApproved(): boolean {
    return this.status.get() === 'approved'
  }

  @Exclude()
  isRejected(): boolean {
    return this.status.get() === 'rejected'
  }
}
