'use client'

import { useState } from 'react'
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
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
import { createGroup, updateGroupRegistrationStatus } from 'apis/groups'
import { GroupRegistrationsSchema } from 'apis/groups/groupSchema'
import Image from 'components/styles/Image'
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
  rejected: {
    label: '却下',
    variant: 'destructive' as const,
    icon: XCircle,
    className: 'text-red-600 bg-red-50 border-red-200'
  }
}

type Props = {
  initialRegistrations: GroupRegistrationsSchema
}

export function GroupRegistrationManagement({ initialRegistrations }: Props) {
  const router = useRouter()
  const [registrations, setRegistrations] =
    useState<GroupRegistrationsSchema>(initialRegistrations)
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const pendingRegistrations = registrations.filter(r => r.status === 'pending')

  const handleApprove = async (
    registration: GroupRegistrationsSchema[number]
  ) => {
    const confirmed = window.confirm(
      `「${registration.name}」をGroupとして登録します。よろしいですか？`
    )
    if (!confirmed) return

    setProcessingId(registration.id)
    setError(null)

    try {
      // 1. Group作成
      await createGroup({
        id: registration.groupId,
        name: registration.name,
        iconSrc: registration.iconSrc
      })

      // 2. ステータス更新
      await updateGroupRegistrationStatus(registration.id, {
        status: 'approved'
      })

      // ローカル状態更新
      setRegistrations(prev =>
        prev.map(r =>
          r.id === registration.id ? { ...r, status: 'approved' as const } : r
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

  const handleReject = async (registrationId: number, name: string) => {
    const confirmed = window.confirm(
      `「${name}」の申請を却下します。よろしいですか？`
    )
    if (!confirmed) return

    setProcessingId(registrationId)
    setError(null)

    try {
      await updateGroupRegistrationStatus(registrationId, { status: 'rejected' })

      setRegistrations(prev =>
        prev.map(r =>
          r.id === registrationId ? { ...r, status: 'rejected' as const } : r
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group申請一覧</CardTitle>
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
              const isProcessing = processingId === registration.id

              return (
                <div
                  key={registration.id}
                  className="flex flex-col gap-3 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {/* Group Icon */}
                    <div className="shrink-0">
                      <Image
                        src={registration.iconSrc}
                        alt={registration.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.svg'
                        }}
                      />
                    </div>

                    {/* Group Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{registration.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        ID: {registration.groupId}
                      </p>
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
                        handleReject(registration.id, registration.name)
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
      </CardContent>
    </Card>
  )
}
