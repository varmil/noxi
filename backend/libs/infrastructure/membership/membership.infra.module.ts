import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { MembershipRepositoryImpl } from './Membership.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    MembershipRepositoryImpl,
    { provide: 'MembershipRepository', useClass: MembershipRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,

    MembershipRepositoryImpl,
    { provide: 'MembershipRepository', useClass: MembershipRepositoryImpl }
  ]
})
export class MembershipInfraModule {}
