import { Injectable, Logger  } from '@nestjs/common'
import { LastClaimedAt, TotalCount } from '@domain/cheer-ticket'
import {
  AWARD,
  Awarded,
  LoginBonus,
  LoginBonusRepository,
  LoginBonusResult,
  TICKET_TYPE
} from '@domain/login-bonus'
import { UserId } from '@domain/user'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class LoginBonusRepositoryImpl implements LoginBonusRepository {
  private readonly logger = new Logger(LoginBonusRepositoryImpl.name)
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  /**
   * AM 5:00 JST境界を見て応援チケットを[AWARD]枚付与
   * SELECT FOR UPDATE で行ロックをかける
   */
  claimDailyIfEligible: LoginBonusRepository['claimDailyIfEligible'] =
    async data => {
      const userId = data.userId.get()

      return await this.prismaInfraService.$transaction(
        async tx => {
          const lockedTicket = await tx.$queryRawUnsafe<
            { userId: string; totalCount: number; lastClaimedAt: Date }[]
          >(
            `SELECT * FROM "CheerTicket" WHERE "userId" = $1 FOR UPDATE`,
            userId
          )

          let result: LoginBonusResult
          const now = new Date()

          // 登録後初回など存在しなければ insert
          if (lockedTicket.length === 0) {
            await tx.cheerTicket.create({
              data: {
                userId,
                totalCount: AWARD,
                lastClaimedAt: now
              }
            })
            result = new LoginBonusResult({
              eligible: true,
              ticketsAwarded: new Awarded(AWARD),
              totalTickets: new TotalCount(AWARD)
            })
          } else {
            const { totalCount, lastClaimedAt } = lockedTicket[0]
            const loginBonus = new LoginBonus({
              userId: new UserId(userId),
              lastClaimedAt: new LastClaimedAt(lastClaimedAt)
            })
            if (loginBonus.canClaimDaily()) {
              await tx.cheerTicket.update({
                where: { userId },
                data: {
                  totalCount: { increment: AWARD },
                  lastClaimedAt: now
                }
              })
              result = new LoginBonusResult({
                eligible: true,
                ticketsAwarded: new Awarded(AWARD),
                totalTickets: new TotalCount(totalCount + AWARD)
              })
            } else {
              this.logger.debug(
                'Daily login bonus not yet available: insufficient time since last claim.',
                {
                  userId,
                  lastClaimedAt
                }
              )
              return new LoginBonusResult({
                eligible: false,
                ticketsAwarded: new Awarded(0),
                totalTickets: new TotalCount(totalCount)
              })
            }
          }

          // ログ記録
          await tx.cheerTicketLog.create({
            data: {
              userId,
              count: AWARD,
              type: TICKET_TYPE,
              claimedAt: now
            }
          })

          return result
        },
        {
          maxWait: 5000,
          timeout: 10000
        }
      )
    }
}
