import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getChannelRegistrations } from 'apis/youtube/getChannelRegistrations'
import { RegistrationHistory } from './RegistrationHistory'

export async function HistoryList() {
  const registrations = await getChannelRegistrations({
    orderBy: { field: 'appliedAt', order: 'desc' },
    limit: 30
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>申請履歴（最新30件）</CardTitle>
        <CardDescription>
          ステータス『完了』になると１週間程度でライブの同期がはじまります
        </CardDescription>
      </CardHeader>
      <CardContent>
        {registrations.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            申請履歴はありません
          </p>
        ) : (
          <div className="space-y-4">
            {registrations.map(registration => (
              <RegistrationHistory
                key={registration.channelId}
                registration={registration}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
