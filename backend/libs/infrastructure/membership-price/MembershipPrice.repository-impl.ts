import { Injectable } from '@nestjs/common'
import { ChannelId, Rate } from '@domain'
import { Currency } from '@domain/lib/currency'
import {
  MembershipPrice,
  MembershipPriceRepository,
  MembershipPrices,
  PriceMicros
} from '@domain/membership-price'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class MembershipPriceRepositoryImpl
  implements MembershipPriceRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll() {
    const rows = await this.prismaInfraService.membershipPrice.findMany()
    return new MembershipPrices(
      rows.map(
        e =>
          new MembershipPrice({
            channelId: new ChannelId(e.channelId),
            priceMicros: new PriceMicros(e.priceMicros)
          })
      )
    )
  }
}
