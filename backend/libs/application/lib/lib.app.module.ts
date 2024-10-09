import { Global, Module } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'

@Global()
@Module({
  providers: [PromiseService],
  exports: [PromiseService]
})
export class LibAppModule {}
