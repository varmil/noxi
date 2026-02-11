import { Module } from '@nestjs/common'
import { HyperChatsAppModule } from '@app/hyper-chats/hyper-chats.app.module'
import { HyperTrainEvaluatorService } from '@app/hyper-trains/hyper-train-evaluator.service'
import { HyperTrainsService } from '@app/hyper-trains/hyper-trains.service'
import { HyperTrainInfraModule } from '@infra/hyper-train/hyper-train.infra.module'

@Module({
  imports: [HyperTrainInfraModule, HyperChatsAppModule],
  providers: [HyperTrainsService, HyperTrainEvaluatorService],
  exports: [
    HyperTrainInfraModule,
    HyperTrainsService,
    HyperTrainEvaluatorService
  ]
})
export class HyperTrainsAppModule {}
