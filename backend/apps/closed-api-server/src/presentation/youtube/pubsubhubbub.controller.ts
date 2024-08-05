import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res
} from '@nestjs/common'
import { Response } from 'express'

/**
 * callbackを扱うコントローラー
 */
@Controller('youtube/pubsubhubbub')
export class PubsubhubbubController {
  constructor() {}

  /**
   * Handle the subscription verification challenge
   * @returns always 200 response
   */
  @Get('/callback')
  challenge(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response
  ) {
    if (mode && challenge) {
      if (mode === 'subscribe') {
        res.status(HttpStatus.OK).send(challenge)
      } else {
        console.log('challenge failed: Invalid mode: ', mode)
        res.status(HttpStatus.OK).send('success')
      }
    } else {
      console.log(
        'challenge failed: Missing mode or challenge',
        mode,
        challenge
      )
      res.status(HttpStatus.OK).send('success')
    }
  }

  @Post('/callback')
  callback(@Body() body: unknown) {
    console.log('callback:', body)
  }
}
