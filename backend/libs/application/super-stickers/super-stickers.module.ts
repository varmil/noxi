import { Module } from '@nestjs/common'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { ExchangeRateInfraModule } from '@infra/exchange-rate/exchange-rate.infra.module'
import { SuperStickerInfraModule } from '@infra/super-sticker/super-sticker.infra.module'

@Module({
  imports: [ExchangeRateInfraModule, SuperStickerInfraModule],
  providers: [SuperStickersService],
  exports: [
    ExchangeRateInfraModule,
    SuperStickerInfraModule,
    SuperStickersService
  ]
})
export class SuperStickersModule {}
