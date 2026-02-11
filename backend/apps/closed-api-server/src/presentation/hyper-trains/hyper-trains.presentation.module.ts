import { Module } from '@nestjs/common'
import { HyperTrainsController } from '@presentation/hyper-trains/hyper-trains.controller'
import { HyperTrainsScenario } from '@presentation/hyper-trains/hyper-trains.scenario'
import { HyperTrainsAppModule } from '@app/hyper-trains/hyper-trains.app.module'

@Module({
  imports: [HyperTrainsAppModule],
  controllers: [HyperTrainsController],
  providers: [HyperTrainsScenario],
  exports: [HyperTrainsScenario]
})
export class HyperTrainsPresentationModule {}
