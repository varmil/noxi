import { Module } from '@nestjs/common'
import { SupersBundlesController } from '@presentation/supers-bundles/supers-bundles.controller'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'

@Module({
  imports: [SupersBundlesAppModule],
  controllers: [SupersBundlesController],
  providers: []
})
export class SupersBundlesPresentationModule {}
