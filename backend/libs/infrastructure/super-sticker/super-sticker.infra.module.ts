import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SuperStickerRepositoryImpl } from './SuperSticker.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SuperStickerRepositoryImpl,
    { provide: 'SuperStickerRepository', useClass: SuperStickerRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,

    SuperStickerRepositoryImpl,
    { provide: 'SuperStickerRepository', useClass: SuperStickerRepositoryImpl }
  ]
})
export class SuperStickerInfraModule {}
