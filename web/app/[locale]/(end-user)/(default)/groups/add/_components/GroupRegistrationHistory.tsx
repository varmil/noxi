'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useTranslations, useFormatter } from 'next-intl'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getGroupRegistrations } from 'apis/groups'
import { GroupRegistrationsSchema } from 'apis/groups/groupSchema'
import Image from 'components/styles/Image'

const statusConfig = {
  pending: {
    label: 'pending',
    variant: 'secondary' as const,
    icon: Clock,
    className: 'text-yellow-600 bg-yellow-50 border-yellow-200'
  },
  approved: {
    label: 'approved',
    variant: 'default' as const,
    icon: CheckCircle,
    className: 'text-green-600 bg-green-50 border-green-200'
  },
  rejected: {
    label: 'rejected',
    variant: 'destructive' as const,
    icon: XCircle,
    className: 'text-red-600 bg-red-50 border-red-200'
  }
}

export function GroupRegistrationHistory() {
  const t = useTranslations('Components.groupRegistrationHistory')
  const format = useFormatter()
  const [registrations, setRegistrations] = useState<GroupRegistrationsSchema>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getGroupRegistrations(30) // 最新30件を取得
        setRegistrations(data)
      } catch (err) {
        console.error('Failed to fetch group registrations:', err)
        setError(t('fetchError'))
      } finally {
        setLoading(false)
      }
    }

    fetchRegistrations()
  }, [t])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 p-3 border rounded-lg"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (registrations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-muted-foreground text-sm">
              {t('emptyState')}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          ステータス『承認済み』になると１週間程度でUI上に表示されます
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {registrations.map(registration => {
          const config = statusConfig[registration.status]
          const StatusIcon = config.icon

          return (
            <div
              key={registration.id}
              className="flex flex-col gap-x-3 p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {/* Group Icon */}
                <div className="shrink-0 aspect-square">
                  <Image
                    src={registration.iconSrc}
                    alt={registration.name}
                    width={36}
                    height={36}
                    className="aspect-square rounded-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.svg'
                    }}
                  />
                </div>

                {/* Group Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium truncate">{registration.name}</p>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    ID: {registration.groupId}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="self-start shrink-0">
                  <Badge
                    variant={config.variant}
                    className={`flex items-center space-x-1 ${config.className}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    <span>
                      {config.label === 'pending' && t('status.pending')}
                      {config.label === 'approved' && t('status.approved')}
                      {config.label === 'rejected' && t('status.rejected')}
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="self-end text-xs text-muted-foreground">
                <span>
                  {format.dateTime(registration.appliedAt, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
