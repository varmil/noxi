import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PromiseService {
  private readonly logger = new Logger(PromiseService.name)

  async allSettled<T>(
    promises: Promise<T>[]
  ): Promise<PromiseSettledResult<T>[]> {
    const result = await Promise.allSettled(promises)

    result
      .filter(e => e.status === 'rejected')
      .forEach(e => this.logger.error(e.reason))

    return result
  }
}
