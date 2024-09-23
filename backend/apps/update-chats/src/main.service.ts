import { Injectable } from '@nestjs/common'

@Injectable()
export class MainService {
  async getHello(): Promise<string> {
    // sleep 20 seconds
    await new Promise(resolve => setTimeout(resolve, 20000))
    console.log('Hello World! (after 20 seconds)')
    return 'Hello World!'
  }
}
