import { Transform } from 'class-transformer'
import { Awarded, TotalCount } from '@domain/login-bonus'

export class LoginBonusResult {
  public readonly eligible: boolean
  @Transform(({ value }: { value: Awarded }) => value.get())
  public readonly ticketsAwarded: Awarded
  @Transform(({ value }: { value: TotalCount }) => value.get())
  public readonly totalTickets: TotalCount

  constructor(args: {
    eligible: boolean
    ticketsAwarded: Awarded
    totalTickets: TotalCount
  }) {
    this.eligible = args.eligible
    this.ticketsAwarded = args.ticketsAwarded
    this.totalTickets = args.totalTickets
  }
}
