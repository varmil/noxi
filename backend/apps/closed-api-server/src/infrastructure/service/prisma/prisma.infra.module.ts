import { Module } from '@nestjs/common'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Module({
  providers: [PrismaInfraService],
  exports: [PrismaInfraService]
})
export class PrismaInfraModule {}
