import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { StreamRepositoryImpl } from '@infra/stream/Stream.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    StreamRepositoryImpl,
    { provide: 'StreamRepository', useClass: StreamRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,

    StreamRepositoryImpl,
    { provide: 'StreamRepository', useClass: StreamRepositoryImpl }
  ]
})
export class StreamInfraModule {}
