export interface TimePeriod {
  name(): string

  days(): number

  /**
   * fetch limit for 1 year
   */
  limit(): number
}
