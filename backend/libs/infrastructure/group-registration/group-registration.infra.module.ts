import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { GroupRegistrationRepositoryImpl } from './GroupRegistration.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    GroupRegistrationRepositoryImpl,
    {
      provide: 'GroupRegistrationRepository',
      useClass: GroupRegistrationRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    GroupRegistrationRepositoryImpl,
    {
      provide: 'GroupRegistrationRepository',
      useClass: GroupRegistrationRepositoryImpl
    }
  ]
})
export class GroupRegistrationInfraModule {}
