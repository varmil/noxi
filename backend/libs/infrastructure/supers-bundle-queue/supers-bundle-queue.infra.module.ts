import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SupersBundleQueueRepositoryImpl } from '@infra/supers-bundle-queue/SupersBundleQueue.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SupersBundleQueueRepositoryImpl,
    {
      provide: 'SupersBundleQueueRepository',
      useClass: SupersBundleQueueRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    SupersBundleQueueRepositoryImpl,
    {
      provide: 'SupersBundleQueueRepository',
      useClass: SupersBundleQueueRepositoryImpl
    }
  ]
})
export class SupersBundleQueueInfraModule {}
