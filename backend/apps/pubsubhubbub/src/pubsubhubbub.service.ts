import { Injectable } from '@nestjs/common';

@Injectable()
export class PubsubhubbubService {
  getHello(): string {
    return 'Hello World!';
  }
}
