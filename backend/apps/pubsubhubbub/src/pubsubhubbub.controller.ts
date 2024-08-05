import { Controller, Get } from '@nestjs/common';
import { PubsubhubbubService } from './pubsubhubbub.service';

@Controller()
export class PubsubhubbubController {
  constructor(private readonly pubsubhubbubService: PubsubhubbubService) {}

  @Get()
  getHello(): string {
    return this.pubsubhubbubService.getHello();
  }
}
