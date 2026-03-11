import { Module } from '@nestjs/common'
import { FeatureInterestsController } from '@presentation/feature-interests/feature-interests.controller'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { FeatureInterestsAppModule } from '@app/feature-interests/feature-interests.app.module'

@Module({
  imports: [AuthModule, FeatureInterestsAppModule],
  controllers: [FeatureInterestsController]
})
export class FeatureInterestsPresentationModule {}
