import { Module } from '@nestjs/common'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'
import { SuperStickerInfraModule } from '@infra/super-sticker/super-sticker.infra.module'

@Module({
  imports: [SuperStickerInfraModule],
  providers: [SuperStickersService],
  exports: [SuperStickerInfraModule, SuperStickersService]
})
export class SuperStickersModule {}
