import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SupersSnapshotRepositoryImpl } from './SupersSnapshot.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SupersSnapshotRepositoryImpl,
    {
      provide: 'SupersSnapshotRepository',
      useClass: SupersSnapshotRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    SupersSnapshotRepositoryImpl,
    {
      provide: 'SupersSnapshotRepository',
      useClass: SupersSnapshotRepositoryImpl
    }
  ]
})
export class SupersSnapshotInfraModule {}
