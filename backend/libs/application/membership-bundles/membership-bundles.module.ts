import { Module } from '@nestjs/common'
import { MembershipBundlesService } from '@app/membership-bundles/membership-bundles.service'
import { MembershipBundleInfraModule } from '@infra/membership-bundle/membership-bundle.infra.module'

@Module({
  imports: [MembershipBundleInfraModule],
  providers: [MembershipBundlesService],
  exports: [MembershipBundleInfraModule, MembershipBundlesService]
})
export class MembershipBundlesAppModule {}
