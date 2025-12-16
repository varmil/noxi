'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLocale, useFormatter, useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { ChannelRegistrationSchema } from 'apis/youtube/schema/channelRegistrationSchema'

export function RegistrationHistory({
  registration
}: {
  registration: ChannelRegistrationSchema
}) {
  const locale = useLocale()
  const format = useFormatter()
  const global = useTranslations('Global')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            処理待ち
          </Badge>
        )
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            承認済み
          </Badge>
        )
      case 'done':
        return (
          <Badge variant="outline" className="bg-violet-100 text-violet-800">
            完了
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            却下
          </Badge>
        )
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format.dateTime(date, {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Collapsible
      key={registration.channelId}
      open={openItems[registration.channelId]}
      onOpenChange={() => toggleItem(registration.channelId)}
      className="border rounded-md overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium truncate" title={registration.title}>
            {registration.title}
          </h3>
          {getStatusBadge(registration.status)}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          ID: {registration.channelId}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            申請日時: {formatDate(registration.appliedAt)}
          </p>
          <CollapsibleTrigger asChild>
            <button className="text-xs flex items-center text-muted-foreground cursor-pointer hover:text-foreground">
              {openItems[registration.channelId] ? (
                <>
                  <span>閉じる</span>
                  <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  <span>詳細を表示</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="px-4 pb-4 pt-2 border-t bg-muted/20">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">国:</dt>
            <dd>
              {new Intl.DisplayNames([locale], {
                type: 'region'
              }).of(registration.country)}
            </dd>

            <dt className="text-muted-foreground">言語:</dt>
            <dd>
              {new Intl.DisplayNames([locale], {
                type: 'language'
              }).of(registration.defaultLanguage)}
            </dd>

            <dt className="text-muted-foreground">性別:</dt>
            <dd>{global(`gender.${registration.gender}`)}</dd>

            <dt className="text-muted-foreground">所属事務所:</dt>
            <dd>{((global as any)(`group.${registration.group}`))}</dd>

            <dt className="text-muted-foreground">登録者数:</dt>
            <dd>{registration.subscriberCount.toLocaleString()}人</dd>

            <dt className="text-muted-foreground">ライブ回数/月:</dt>
            <dd>{registration.liveStreamCount}回</dd>
          </dl>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
