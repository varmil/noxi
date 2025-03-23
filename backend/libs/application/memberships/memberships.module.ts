import { Module } from '@nestjs/common'
import { MembershipsService } from '@app/memberships/memberships.service'
import { MembershipInfraModule } from '@infra/membership/membership.infra.module'

@Module({
  imports: [MembershipInfraModule],
  providers: [MembershipsService],
  exports: [MembershipInfraModule, MembershipsService]
})
export class MembershipsModule {}
