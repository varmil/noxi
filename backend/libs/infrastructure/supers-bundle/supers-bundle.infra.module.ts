import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SupersBundleRepositoryImpl } from '@infra/supers-bundle/SupersBundle.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SupersBundleRepositoryImpl,
    {
      provide: 'SupersBundleRepository',
      useClass: SupersBundleRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    SupersBundleRepositoryImpl,
    {
      provide: 'SupersBundleRepository',
      useClass: SupersBundleRepositoryImpl
    }
  ]
})
export class SupersBundleInfraModule {}
