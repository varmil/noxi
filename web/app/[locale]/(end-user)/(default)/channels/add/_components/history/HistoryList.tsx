'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

type Application = {
  id: string
  channelId: string
  channelTitle: string
  // 新しいフィールドを追加
  country: string
  countryName: string
  language: string
  languageName: string
  gender: string
  genderName: string
  agency: string
  agencyName: string
  subscriberCount: number
  recentLiveStreams: number
  timestamp: string
  status: 'pending' | 'approved' | 'rejected'
}

export function HistoryList() {
  const [applications, setApplications] = useState<Application[]>([])
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const format = useFormatter()

  useEffect(() => {
    // ローカルストレージから履歴を取得（デモ用）
    const history = JSON.parse(
      localStorage.getItem('applicationHistory') || '[]'
    )
    setApplications(history)
  }, [])

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
    <Card>
      <CardHeader>
        <CardTitle>申請履歴</CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            申請履歴はありません
          </p>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <Collapsible
                key={app.id}
                open={openItems[app.id]}
                onOpenChange={() => toggleItem(app.id)}
                className="border rounded-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3
                      className="font-medium truncate"
                      title={app.channelTitle}
                    >
                      {app.channelTitle}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ID: {app.channelId}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">
                      申請日時: {formatDate(app.timestamp)}
                    </p>
                    <CollapsibleTrigger asChild>
                      <button className="text-xs flex items-center text-muted-foreground cursor-pointer hover:text-foreground">
                        {openItems[app.id] ? (
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
                      <dd>{app.countryName}</dd>

                      <dt className="text-muted-foreground">言語:</dt>
                      <dd>{app.languageName}</dd>

                      <dt className="text-muted-foreground">性別:</dt>
                      <dd>{app.genderName}</dd>

                      <dt className="text-muted-foreground">所属事務所:</dt>
                      <dd>{app.agencyName}</dd>

                      <dt className="text-muted-foreground">登録者数:</dt>
                      <dd>{app.subscriberCount.toLocaleString()}人</dd>

                      <dt className="text-muted-foreground">ライブ回数/月:</dt>
                      <dd>{app.recentLiveStreams}回</dd>
                    </dl>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
