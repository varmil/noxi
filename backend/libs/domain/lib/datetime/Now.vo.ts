import { DateValueObject } from '@domain/lib/vo'

export class Now extends DateValueObject {
  constructor() {
    super(new Date())
  }
}
