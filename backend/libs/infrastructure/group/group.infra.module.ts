import { Module } from '@nestjs/common'
import { GroupRepositoryImpl } from '@infra/group/Group.repository-impl'
import { GroupRegistrationRepositoryImpl } from '@infra/group/GroupRegistration.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    GroupRepositoryImpl,
    {
      provide: 'GroupRepository',
      useClass: GroupRepositoryImpl
    },
    GroupRegistrationRepositoryImpl,
    {
      provide: 'GroupRegistrationRepository',
      useClass: GroupRegistrationRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    GroupRepositoryImpl,
    {
      provide: 'GroupRepository',
      useClass: GroupRepositoryImpl
    },
    GroupRegistrationRepositoryImpl,
    {
      provide: 'GroupRegistrationRepository',
      useClass: GroupRegistrationRepositoryImpl
    }
  ]
})
export class GroupInfraModule {}
