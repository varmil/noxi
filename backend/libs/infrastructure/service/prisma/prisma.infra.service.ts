import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaInfraService extends PrismaClient {
  // export class PrismaInfraService extends PrismaClient implements OnModuleInit {
  // async onModuleInit() {
  //   await this.$connect()
  // }
}
