import { Inject, Injectable } from '@nestjs/common'
import { SuperStickerRepository } from '@domain/super-xxx'

@Injectable()
export class SuperStickersService {
  constructor(
    @Inject('SuperStickerRepository')
    private readonly superStickerRepository: SuperStickerRepository
  ) {}

  async save(
    args: Parameters<SuperStickerRepository['save']>[0]
  ): Promise<void> {
    await this.superStickerRepository.save(args)
  }
}
