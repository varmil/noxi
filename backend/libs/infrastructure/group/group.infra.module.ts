import { Module } from '@nestjs/common'
import { GroupRepositoryImpl } from '@infra/group/Group.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    GroupRepositoryImpl,
    {
      provide: 'GroupRepository',
      useClass: GroupRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    GroupRepositoryImpl,
    {
      provide: 'GroupRepository',
      useClass: GroupRepositoryImpl
    }
  ]
})
export class GroupInfraModule {}
