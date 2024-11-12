import { Module } from '@nestjs/common'
import { SupersBundleQueuesService } from '@app/supers-bundle-queues/supers-bundle-queues.service'
import { SupersBundleQueueInfraModule } from '@infra/supers-bundle-queue/supers-bundle-queue.infra.module'

@Module({
  imports: [SupersBundleQueueInfraModule],
  providers: [SupersBundleQueuesService],
  exports: [SupersBundleQueueInfraModule, SupersBundleQueuesService]
})
export class SupersBundleQueuesModule {}
