import { Module } from '@nestjs/common'
import { ChartsController } from '@presentation/hololive/charts.controller'
import { HololiveController } from '@presentation/hololive/hololive.controller'
import { HololiveAppModule } from '@app/hololive/hololive.app.module'

@Module({
  imports: [HololiveAppModule],
  controllers: [HololiveController, ChartsController],
  providers: []
})
export class HololivePresentationModule {}
