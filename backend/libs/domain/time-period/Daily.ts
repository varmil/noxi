import { TimePeriod } from '@domain/time-period/TimePeriod'

export class Daily implements TimePeriod {
  constructor() {}

  name(): string {
    return 'daily'
  }

  days(): number {
    return 1
  }

  limit(): number {
    return 365
  }
}
