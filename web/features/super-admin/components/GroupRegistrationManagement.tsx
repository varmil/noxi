'use client'

import { useState } from 'react'
import { Clock, CheckCircle, XCircle, AlertCircle, Pencil } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createGroup, updateGroupRegistrationStatus } from 'apis/groups'
import { GroupRegistrationsSchema } from 'apis/groups/groupSchema'
import Image from 'components/styles/Image'
import { useRouter } from 'lib/navigation'

type EditableFields = {
  groupId: string
  name: string
  iconSrc: string
}

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
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedFields, setEditedFields] = useState<Record<number, EditableFields>>(
    {}
  )

  const pendingRegistrations = registrations.filter(r => r.status === 'pending')
  const pastRegistrations = registrations.filter(r => r.status !== 'pending')

  const getEditedValues = (registration: GroupRegistrationsSchema[number]) => {
    return (
      editedFields[registration.id] || {
        groupId: registration.groupId,
        name: registration.name,
        iconSrc: registration.iconSrc
      }
    )
  }

  const handleEditToggle = (registration: GroupRegistrationsSchema[number]) => {
    if (editingId === registration.id) {
      setEditingId(null)
    } else {
      setEditingId(registration.id)
      if (!editedFields[registration.id]) {
        setEditedFields(prev => ({
          ...prev,
          [registration.id]: {
            groupId: registration.groupId,
            name: registration.name,
            iconSrc: registration.iconSrc
          }
        }))
      }
    }
  }

  const handleFieldChange = (
    registrationId: number,
    field: keyof EditableFields,
    value: string
  ) => {
    setEditedFields(prev => ({
      ...prev,
      [registrationId]: {
        ...prev[registrationId],
        [field]: value
      }
    }))
  }

  const handleApprove = async (
    registration: GroupRegistrationsSchema[number]
  ) => {
    const values = getEditedValues(registration)
    const hasChanges =
      values.groupId !== registration.groupId ||
      values.name !== registration.name ||
      values.iconSrc !== registration.iconSrc

    const message = hasChanges
      ? `以下の内容でGroupとして登録します。よろしいですか？\n\nID: ${values.groupId}\n名前: ${values.name}`
      : `「${registration.name}」をGroupとして登録します。よろしいですか？`
    const confirmed = window.confirm(message)
    if (!confirmed) return

    setProcessingId(registration.id)
    setError(null)

    try {
      // 1. Group作成（編集後の値を使用）
      await createGroup({
        id: values.groupId,
        name: values.name,
        iconSrc: values.iconSrc
      })

      // 2. ステータス更新
      await updateGroupRegistrationStatus(registration.id, {
        status: 'approved'
      })

      // ローカル状態更新
      setRegistrations(prev =>
        prev.map(r =>
          r.id === registration.id
            ? {
                ...r,
                status: 'approved' as const,
                groupId: values.groupId,
                name: values.name,
                iconSrc: values.iconSrc
              }
            : r
        )
      )

      setEditingId(null)
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
              const isEditing = editingId === registration.id
              const values = getEditedValues(registration)

              return (
                <div
                  key={registration.id}
                  className="flex flex-col gap-3 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {/* Group Icon */}
                    <div className="shrink-0">
                      <Image
                        src={isEditing ? values.iconSrc : registration.iconSrc}
                        alt={isEditing ? values.name : registration.name}
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
                      <p className="font-medium truncate">
                        {isEditing ? values.name : registration.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        ID: {isEditing ? values.groupId : registration.groupId}
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

                  {/* Edit Form */}
                  {isEditing && (
                    <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                      <div className="grid gap-2">
                        <Label htmlFor={`groupId-${registration.id}`}>
                          Group ID
                        </Label>
                        <Input
                          id={`groupId-${registration.id}`}
                          value={values.groupId}
                          onChange={e =>
                            handleFieldChange(
                              registration.id,
                              'groupId',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`name-${registration.id}`}>名前</Label>
                        <Input
                          id={`name-${registration.id}`}
                          value={values.name}
                          onChange={e =>
                            handleFieldChange(
                              registration.id,
                              'name',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`iconSrc-${registration.id}`}>
                          アイコンURL
                        </Label>
                        <Input
                          id={`iconSrc-${registration.id}`}
                          value={values.iconSrc}
                          onChange={e =>
                            handleFieldChange(
                              registration.id,
                              'iconSrc',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                      onClick={() => handleEditToggle(registration)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      {isEditing ? '編集終了' : '編集'}
                    </Button>
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
                    key={registration.id}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    {/* Group Icon */}
                    <div className="shrink-0">
                      <Image
                        src={registration.iconSrc}
                        alt={registration.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.svg'
                        }}
                      />
                    </div>

                    {/* Group Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">
                        {registration.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        ID: {registration.groupId}
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
