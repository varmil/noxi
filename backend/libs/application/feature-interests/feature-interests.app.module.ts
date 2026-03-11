import { Module } from '@nestjs/common'
import { FeatureInterestsService } from '@app/feature-interests/feature-interests.service'
import { FeatureInterestInfraModule } from '@infra/feature-interest/feature-interest.infra.module'

@Module({
  imports: [FeatureInterestInfraModule],
  providers: [FeatureInterestsService],
  exports: [FeatureInterestInfraModule, FeatureInterestsService]
})
export class FeatureInterestsAppModule {}
