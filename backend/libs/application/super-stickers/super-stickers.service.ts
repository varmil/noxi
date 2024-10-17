import { Inject, Injectable } from '@nestjs/common'
import { SuperStickerRepository, SuperStickers } from '@domain/supers'

@Injectable()
export class SuperStickersService {
  constructor(
    @Inject('SuperStickerRepository')
    private readonly superStickerRepository: SuperStickerRepository
  ) {}

  async findAll(
    args: Parameters<SuperStickerRepository['findAll']>[0]
  ): Promise<SuperStickers> {
    return await this.superStickerRepository.findAll(args)
  }

  async save(
    args: Parameters<SuperStickerRepository['save']>[0]
  ): Promise<void> {
    await this.superStickerRepository.save(args)
  }
}
