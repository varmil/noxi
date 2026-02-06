import { Injectable } from '@nestjs/common'
import {
  Granted,
  HyperChatTicketProgressRepository,
  LoginCount
} from '@domain/hyper-chat-ticket-progress'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

const TICKET_VALIDITY_DAYS = 30

@Injectable()
export class HyperChatTicketProgressRepositoryImpl
  implements HyperChatTicketProgressRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  /**
   * JST 5時基準の日付キーを取得
   * 既存 LoginBonus.entity.ts と同じロジック
   */
  private getJst5amDayKey(date: Date): string {
    const JST_OFFSET_MINUTES = 9 * 60
    const jstTime = new Date(date.getTime() + JST_OFFSET_MINUTES * 60 * 1000)
    const year = jstTime.getFullYear()
    const month = jstTime.getMonth()
    const day = jstTime.getDate()
    const hour = jstTime.getHours()
    const adjustedDate =
      hour < 5
        ? new Date(Date.UTC(year, month, day - 1, 0, 0, 0))
        : new Date(Date.UTC(year, month, day, 0, 0, 0))
    return adjustedDate.toISOString().split('T')[0]
  }

  recordLoginAndGrantIfEligible: HyperChatTicketProgressRepository['recordLoginAndGrantIfEligible'] =
    async ({ where }) => {
      const userId = where.userId.get()
      const todayKey = this.getJst5amDayKey(new Date())

      return await this.prismaInfraService.$transaction(async tx => {
        // 1. 既存の進捗を取得（なければ作成）
        let progress = await tx.hyperChatTicketProgress.findUnique({
          where: { userId }
        })

        if (!progress) {
          // 初回ログイン: count=1 で作成
          progress = await tx.hyperChatTicketProgress.create({
            data: {
              userId,
              count: 1,
              lastLoginKey: todayKey
            }
          })
          return {
            granted: new Granted(false),
            currentCount: new LoginCount(1)
          }
        }

        // 2. 同じ日付キーなら何もしない（1日1回のみカウント）
        if (progress.lastLoginKey === todayKey) {
          return {
            granted: new Granted(false),
            currentCount: new LoginCount(progress.count)
          }
        }

        // 3. カウントを +1
        const newCount = progress.count + 1

        if (newCount >= 3) {
          // 4a. 3に達したらチケット付与＆カウントリセット
          const expiresAt = new Date(
            Date.now() + TICKET_VALIDITY_DAYS * 24 * 60 * 60 * 1000
          )
          await tx.hyperChatTicket.create({
            data: {
              userId,
              expiresAt,
              sourceType: 'login_bonus'
            }
          })
          await tx.hyperChatTicketProgress.update({
            where: { userId },
            data: { count: 0, lastLoginKey: todayKey }
          })
          return {
            granted: new Granted(true),
            currentCount: new LoginCount(0)
          }
        } else {
          // 4b. カウント更新のみ
          await tx.hyperChatTicketProgress.update({
            where: { userId },
            data: { count: newCount, lastLoginKey: todayKey }
          })
          return {
            granted: new Granted(false),
            currentCount: new LoginCount(newCount)
          }
        }
      })
    }
}
