import { TimePeriod } from '@domain/time-period/TimePeriod'

export class Monthly implements TimePeriod {
  constructor() {}

  name(): string {
    return 'monthly'
  }

  days(): number {
    return 30
  }

  limit(): number {
    return 12
  }
}
