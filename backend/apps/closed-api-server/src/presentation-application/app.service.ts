import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! v1.1.0'
  }

  getFoo(): string {
    return 'FOOOOO!'
  }

  getBar(): string {
    return 'BARRRRR!'
  }
}
