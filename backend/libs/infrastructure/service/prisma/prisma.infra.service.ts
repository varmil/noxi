import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/generated/client'

@Injectable()
export class PrismaInfraService extends PrismaClient {}

// @Injectable()
// export class PrismaInfraService
//   extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
//   implements OnModuleInit
// {
//   private readonly logger = new Logger(PrismaInfraService.name)
//   constructor() {
//     super({ log: [{ emit: 'event', level: 'query' }] })
//   }
//   async onModuleInit() {
//     this.$on('query', event => {
//       this.logger.log(
//         `Query: ${event.query}`,
//         `Params: ${event.params}`,
//         `Duration: ${event.duration} ms`
//       )
//     })
//     this.$on('info', event => {
//       this.logger.log(`message: ${event.message}`)
//     })
//     this.$on('error', event => {
//       this.logger.log(`error: ${event.message}`)
//     })
//     this.$on('warn', event => {
//       this.logger.log(`warn: ${event.message}`)
//     })
//     await this.$connect()
//   }
// }
