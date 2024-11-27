import { Module } from '@nestjs/common'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersBundleInfraModule } from '@infra/supers-bundle/supers-bundle.infra.module'

@Module({
  imports: [SupersBundleInfraModule],
  providers: [SupersBundlesService],
  exports: [SupersBundleInfraModule, SupersBundlesService]
})
export class SupersBundlesAppModule {}
