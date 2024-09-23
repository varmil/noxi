import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  async getHello(): Promise<string> {
    // sleep 20 seconds
    await new Promise(resolve => setTimeout(resolve, 20000))
    this.logger.log('Hello World! (after 20 seconds)')
    return 'Hello World!'
  }
}
