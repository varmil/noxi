import { Module } from '@nestjs/common'
import { MembershipPricesService } from '@app/membership-prices/membership-prices.service'
import { MembershipPriceInfraModule } from '@infra/membership-price/membership-price.infra.module'

@Module({
  imports: [MembershipPriceInfraModule],
  providers: [MembershipPricesService],
  exports: [MembershipPriceInfraModule, MembershipPricesService]
})
export class MembershipPricesAppModule {}
