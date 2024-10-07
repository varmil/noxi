import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubScenario } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.scenario'
import { DeletedEntry, XMLFactory } from '@domain/youtube'
import { UpdatedEntry } from '@domain/youtube/xml/UpdatedEntry.vo'

/**
 * challenge, callbackを扱う
 */
@Controller('youtube/pubsubhubbub')
export class PubsubhubbubController {
  constructor(
    private readonly pubsubhubbubScenario: PubsubhubbubScenario,
    private readonly cryptoService: CryptoService
  ) {}

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
      if (mode === 'subscribe' || mode === 'unsubscribe') {
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
  async callback(@Req() req: Request, @Res() res: Response) {
    if (!this.cryptoService.verify({ req, res })) return

    try {
      const updatedEntry = XMLFactory.convertToUpdatedEntry(req.body as string)
      if (updatedEntry) {
        await this.pubsubhubbubScenario.handleUpdatedCallback({
          entry: new UpdatedEntry(updatedEntry)
        })
        return res.status(HttpStatus.ACCEPTED).send()
      }

      const deletedEntry = XMLFactory.convertToDeletedEntry(req.body as string)
      if (deletedEntry) {
        await this.pubsubhubbubScenario.handleDeletedCallback({
          entry: new DeletedEntry(deletedEntry)
        })
        return res.status(HttpStatus.ACCEPTED).send()
      }
    } catch (error) {
      if (error instanceof HttpException) {
        console.info('callback not done:', error.message)
      } else {
        console.info('callback not done:', error)
      }
    }

    return res.status(HttpStatus.ACCEPTED).send()
  }
}
