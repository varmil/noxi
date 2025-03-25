import { Injectable } from '@nestjs/common'
import {
  MembershipPrice,
  PriceMicros,
  MembershipPriceRepository
} from '@domain/membership-price'
import { ChannelId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class MembershipPriceRepositoryImpl
  implements MembershipPriceRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findById(channelId: ChannelId) {
    const row = await this.prismaInfraService.membershipPrice.findUnique({
      where: { channelId: channelId.get() }
    })
    if (!row) {
      return null
    }
    return new MembershipPrice({
      channelId,
      priceMicros: new PriceMicros(row.priceMicros)
    })
  }
}
