import { Module } from '@nestjs/common'
import { GoldenTimeRepositoryImpl } from '@infra/golden-time/GoldenTime.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    GoldenTimeRepositoryImpl,
    {
      provide: 'GoldenTimeRepository',
      useClass: GoldenTimeRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    GoldenTimeRepositoryImpl,
    {
      provide: 'GoldenTimeRepository',
      useClass: GoldenTimeRepositoryImpl
    }
  ]
})
export class GoldenTimeInfraModule {}
