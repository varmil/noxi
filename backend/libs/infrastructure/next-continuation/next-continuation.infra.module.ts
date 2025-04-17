import { Module } from '@nestjs/common'
import { NextContinuationRepositoryImpl } from '@infra/next-continuation/NextContinuation.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    NextContinuationRepositoryImpl,
    {
      provide: 'NextContinuationRepository',
      useClass: NextContinuationRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    NextContinuationRepositoryImpl,
    {
      provide: 'NextContinuationRepository',
      useClass: NextContinuationRepositoryImpl
    }
  ]
})
export class NextContinuationInfraModule {}
