import { Module } from '@nestjs/common'
import { SupersBundlesController } from '@presentation/supers-bundles/supers-bundles.controller'
import { SupersBundlesModule } from '@app/supers-bundles/supers-bundles.module'

@Module({
  imports: [SupersBundlesModule],
  controllers: [SupersBundlesController],
  providers: []
})
export class SupersBundlesPresentationModule {}
