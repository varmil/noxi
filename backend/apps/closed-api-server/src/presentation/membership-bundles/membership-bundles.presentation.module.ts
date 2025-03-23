import { Module } from '@nestjs/common'
import { MembershipBundlesController } from '@presentation/membership-bundles/membership-bundles.controller'
import { MembershipBundlesAppModule } from '@app/membership-bundles/membership-bundles.module'

@Module({
  imports: [MembershipBundlesAppModule],
  controllers: [MembershipBundlesController],
  providers: []
})
export class MembershipBundlesPresentationModule {}
