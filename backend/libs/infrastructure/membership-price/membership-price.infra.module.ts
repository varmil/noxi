import { Module } from '@nestjs/common'
import { MembershipPriceRepositoryImpl } from '@infra/membership-price/MembershipPrice.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    MembershipPriceRepositoryImpl,
    {
      provide: 'MembershipPriceRepository',
      useClass: MembershipPriceRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    MembershipPriceRepositoryImpl,
    {
      provide: 'MembershipPriceRepository',
      useClass: MembershipPriceRepositoryImpl
    }
  ]
})
export class MembershipPriceInfraModule {}
