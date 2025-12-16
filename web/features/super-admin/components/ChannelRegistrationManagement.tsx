'use client'

import { useState } from 'react'
import { Clock, CheckCircle, XCircle, AlertCircle, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChannelRegistrationsSchema } from 'apis/youtube/schema/channelRegistrationSchema'
import { updateChannelRegistrationStatus } from 'apis/youtube/updateChannelRegistrationStatus'
import { useRouter } from 'lib/navigation'

const statusConfig = {
  pending: {
    label: '審査中',
    variant: 'secondary' as const,
    icon: Clock,
    className: 'text-yellow-600 bg-yellow-50 border-yellow-200'
  },
  approved: {
    label: '承認済み',
    variant: 'default' as const,
    icon: CheckCircle,
    className: 'text-green-600 bg-green-50 border-green-200'
  },
  done: {
    label: '完了',
    variant: 'default' as const,
    icon: Check,
    className: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  rejected: {
    label: '却下',
    variant: 'destructive' as const,
    icon: XCircle,
    className: 'text-red-600 bg-red-50 border-red-200'
  }
}

type Props = {
  initialRegistrations: ChannelRegistrationsSchema
}

export function ChannelRegistrationManagement({
  initialRegistrations
}: Props) {
  const router = useRouter()
  const [registrations, setRegistrations] =
    useState<ChannelRegistrationsSchema>(initialRegistrations)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const pendingRegistrations = registrations.filter(r => r.status === 'pending')
  const pastRegistrations = registrations.filter(r => r.status !== 'pending')

  const handleApprove = async (
    registration: ChannelRegistrationsSchema[number]
  ) => {
    const confirmed = window.confirm(
      `「${registration.title}」を承認します。よろしいですか？`
    )
    if (!confirmed) return

    setProcessingId(registration.channelId)
    setError(null)

    try {
      await updateChannelRegistrationStatus(registration.channelId, {
        status: 'approved'
      })

      setRegistrations(prev =>
        prev.map(r =>
          r.channelId === registration.channelId
            ? { ...r, status: 'approved' as const }
            : r
        )
      )

      toast.success('申請を承認しました')
      router.refresh()
    } catch (err) {
      console.error('Failed to approve:', err)
      toast.error('承認に失敗しました。もう一度お試しください')
      setError('承認に失敗しました')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (channelId: string, title: string) => {
    const confirmed = window.confirm(
      `「${title}」の申請を却下します。よろしいですか？`
    )
    if (!confirmed) return

    setProcessingId(channelId)
    setError(null)

    try {
      await updateChannelRegistrationStatus(channelId, { status: 'rejected' })

      setRegistrations(prev =>
        prev.map(r =>
          r.channelId === channelId
            ? { ...r, status: 'rejected' as const }
            : r
        )
      )

      toast.success('申請を却下しました')
      router.refresh()
    } catch (err) {
      console.error('Failed to reject:', err)
      toast.error('却下に失敗しました。もう一度お試しください')
      setError('却下に失敗しました')
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateStr))
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel申請一覧</CardTitle>
        <CardDescription>
          審査待ちの申請を承認または却下してください
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {pendingRegistrations.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground text-sm">
              審査待ちの申請はありません
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRegistrations.map(registration => {
              const config = statusConfig[registration.status]
              const StatusIcon = config.icon
              const isProcessing = processingId === registration.channelId

              return (
                <div
                  key={registration.channelId}
                  className="flex flex-col gap-3 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {/* Channel Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{registration.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        ID: {registration.channelId}
                      </p>
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        <span>登録者: {formatNumber(registration.subscriberCount)}</span>
                        <span>•</span>
                        <span>配信数: {formatNumber(registration.liveStreamCount)}</span>
                        <span>•</span>
                        <span>Group: {registration.group}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(registration.appliedAt)}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <Badge
                      variant={config.variant}
                      className={`flex items-center gap-1 ${config.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      <span>{config.label}</span>
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      disabled={isProcessing}
                      onClick={() => handleApprove(registration)}
                    >
                      {isProcessing ? '処理中...' : '承認'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isProcessing}
                      onClick={() =>
                        handleReject(registration.channelId, registration.title)
                      }
                    >
                      {isProcessing ? '処理中...' : '却下'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 過去の申請一覧 */}
        {pastRegistrations.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              過去の申請一覧
            </h3>
            <div className="space-y-2">
              {pastRegistrations.map(registration => {
                const config = statusConfig[registration.status]
                const StatusIcon = config.icon

                return (
                  <div
                    key={registration.channelId}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    {/* Channel Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">
                        {registration.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        ID: {registration.channelId}
                      </p>
                    </div>

                    {/* Applied Date */}
                    <p className="text-xs text-muted-foreground shrink-0">
                      {formatDate(registration.appliedAt)}
                    </p>

                    {/* Status Badge */}
                    <Badge
                      variant={config.variant}
                      className={`flex items-center gap-1 shrink-0 ${config.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      <span>{config.label}</span>
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
