import { Module } from '@nestjs/common'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'
import { StreamInfraModule } from '@infra/stream/stream.infra.module'
import { SupersBundleQueueInfraModule } from '@infra/supers-bundle-queue/supers-bundle-queue.infra.module'

@Module({
  imports: [SupersBundleQueueInfraModule, StreamInfraModule],
  providers: [SupersBundleQueuesService],
  exports: [
    SupersBundleQueueInfraModule,
    StreamInfraModule,
    SupersBundleQueuesService
  ]
})
export class SupersBundleQueuesModule {}
