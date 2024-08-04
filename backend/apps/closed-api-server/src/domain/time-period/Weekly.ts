import { TimePeriod } from '@domain/time-period/TimePeriod'

export class Weekly implements TimePeriod {
  constructor() {}

  name(): string {
    return 'weekly'
  }

  days(): number {
    return 7
  }

  limit(): number {
    return 52
  }
}
