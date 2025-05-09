import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import {
  LastClaimedAt,
  LoginBonus,
  LoginBonusRepository
} from '@domain/login-bonus'
import { UserId } from '@domain/user'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class LoginBonusRepositoryImpl implements LoginBonusRepository {
  private readonly logger = new Logger(LoginBonusRepositoryImpl.name)
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  /**
   * 20時間経っていれば応援チケットを[1]枚付与
   * SELECT FOR UPDATE で行ロックをかける
   */
  claimDailyIfEligible: LoginBonusRepository['claimDailyIfEligible'] =
    async data => {
      const userId = data.userId.get()

      const claimed = await this.prismaInfraService.$transaction(async tx => {
        const lockedTicket = await tx.$queryRawUnsafe<
          { userId: string; totalCount: number; lastClaimedAt: Date }[]
        >(`SELECT * FROM "CheerTicket" WHERE "userId" = $1 FOR UPDATE`, userId)

        const now = new Date()

        // 登録後初回など存在しなければ insert
        if (lockedTicket.length === 0) {
          await tx.cheerTicket.create({
            data: {
              userId,
              totalCount: 1,
              lastClaimedAt: now
            }
          })
        } else {
          const { lastClaimedAt } = lockedTicket[0]
          const loginBonus = new LoginBonus({
            userId: new UserId(userId),
            lastClaimedAt: new LastClaimedAt(lastClaimedAt)
          })
          if (loginBonus.canClaimDaily()) {
            await tx.cheerTicket.update({
              where: { userId },
              data: {
                totalCount: { increment: 1 },
                lastClaimedAt: now
              }
            })
          } else {
            this.logger.debug('まだ受け取れません', {
              userId,
              lastClaimedAt,
              now
            })
            return false
          }
        }

        // ログ記録
        await tx.cheerTicketLog.create({
          data: {
            userId,
            count: 1,
            type: 'dailyLoginBonus',
            claimedAt: now
          }
        })

        return true
      })

      return claimed
    }
}
