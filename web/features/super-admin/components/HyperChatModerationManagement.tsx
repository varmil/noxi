'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { removeModeration } from 'apis/hyper-chat-moderations/removeModeration'
import { setModeration } from 'apis/hyper-chat-moderations/setModeration'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { useRouter } from 'lib/navigation'

type Props = {
  initialHyperChats: HyperChatSchema[]
  totalCount: number
  currentPage: number
  pageSize: number
  channelMap: Record<string, { title: string; thumbnailUrl?: string }>
}

export function HyperChatModerationManagement({
  initialHyperChats,
  totalCount,
  currentPage,
  pageSize,
  channelMap
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<Record<number, boolean>>({})
  const totalPages = Math.ceil(totalCount / pageSize)

  const handleSetModeration = async (
    hyperChat: HyperChatSchema,
    status: 'warn' | 'ban'
  ) => {
    setLoading(prev => ({ ...prev, [hyperChat.id]: true }))
    try {
      await setModeration(hyperChat.id, hyperChat.channelId, status)
      toast.success(
        status === 'warn' ? 'Warn を設定しました' : 'Ban を設定しました',
        { description: `ID: ${hyperChat.id}` }
      )
      router.refresh()
    } catch (error) {
      toast.error('設定に失敗しました', {
        description: error instanceof Error ? error.message : '不明なエラー'
      })
    } finally {
      setLoading(prev => ({ ...prev, [hyperChat.id]: false }))
    }
  }

  const handleRemoveModeration = async (hyperChat: HyperChatSchema) => {
    setLoading(prev => ({ ...prev, [hyperChat.id]: true }))
    try {
      await removeModeration(hyperChat.id, hyperChat.channelId)
      toast.success('モデレーションを解除しました', {
        description: `ID: ${hyperChat.id}`
      })
      router.refresh()
    } catch (error) {
      toast.error('解除に失敗しました', {
        description: error instanceof Error ? error.message : '不明なエラー'
      })
    } finally {
      setLoading(prev => ({ ...prev, [hyperChat.id]: false }))
    }
  }

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`)
    router.refresh()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tokyo'
    }).format(date)
  }

  const truncateMessage = (message: string, maxLength = 40) => {
    if (message.length <= maxLength) return message
    return message.slice(0, maxLength) + '...'
  }

  const getModerationBadge = (status?: string | null) => {
    if (!status) return null
    if (status === 'warn') {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
          Warn
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700">
        Ban
      </Badge>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-2xl">ハイパーチャット管理</CardTitle>
              <CardDescription className="mt-2">
                ハイパーチャットの Warn / Ban を管理します
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              全 {totalCount} 件
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {initialHyperChats.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">ハイパーチャットはありません</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">ID</TableHead>
                      <TableHead>投稿者</TableHead>
                      <TableHead>チャンネル</TableHead>
                      <TableHead className="text-right">金額</TableHead>
                      <TableHead>メッセージ</TableHead>
                      <TableHead className="text-right">いいね</TableHead>
                      <TableHead>日時</TableHead>
                      <TableHead className="w-[80px]">状態</TableHead>
                      <TableHead className="w-[70px] text-center">
                        Warn
                      </TableHead>
                      <TableHead className="w-[70px] text-center">
                        Ban
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {initialHyperChats.map(hc => (
                      <TableRow
                        key={hc.id}
                        className={
                          hc.moderationStatus === 'ban'
                            ? 'opacity-50'
                            : undefined
                        }
                      >
                        <TableCell className="font-mono text-xs">
                          {hc.id}
                        </TableCell>
                        <TableCell className="max-w-[120px] truncate">
                          {hc.isAnonymous
                            ? '匿名'
                            : hc.author.name || '不明'}
                        </TableCell>
                        <TableCell className="max-w-[160px]">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-6 shrink-0">
                              <AvatarImage
                                src={channelMap[hc.channelId]?.thumbnailUrl}
                                alt={
                                  channelMap[hc.channelId]?.title ??
                                  hc.channelId
                                }
                              />
                              <AvatarFallback className="text-[10px]">
                                {(
                                  channelMap[hc.channelId]?.title ??
                                  hc.channelId
                                ).slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate text-sm">
                              {channelMap[hc.channelId]?.title ??
                                hc.channelId.slice(0, 12) + '...'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {hc.amount === 0
                            ? '無料'
                            : `¥${hc.amount.toLocaleString()}`}
                        </TableCell>
                        <TableCell
                          className="max-w-[200px]"
                          title={hc.message}
                        >
                          <span className="line-clamp-1 text-sm">
                            {truncateMessage(hc.message)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {hc.likeCount}
                        </TableCell>
                        <TableCell className="text-xs whitespace-nowrap">
                          {formatDate(hc.createdAt)}
                        </TableCell>
                        <TableCell>
                          {getModerationBadge(hc.moderationStatus)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={hc.moderationStatus === 'warn'}
                            disabled={loading[hc.id]}
                            onCheckedChange={checked => {
                              if (checked) {
                                handleSetModeration(hc, 'warn')
                              } else {
                                handleRemoveModeration(hc)
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={hc.moderationStatus === 'ban'}
                            disabled={loading[hc.id]}
                            onCheckedChange={checked => {
                              if (checked) {
                                handleSetModeration(hc, 'ban')
                              } else {
                                handleRemoveModeration(hc)
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {initialHyperChats.map(hc => (
                  <Card
                    key={hc.id}
                    className={
                      hc.moderationStatus === 'ban' ? 'opacity-50' : undefined
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          ID: {hc.id}
                        </span>
                        {getModerationBadge(hc.moderationStatus)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            投稿者:
                          </span>
                          <span>
                            {hc.isAnonymous
                              ? '匿名'
                              : hc.author.name || '不明'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            チャンネル:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Avatar className="size-5 shrink-0">
                              <AvatarImage
                                src={
                                  channelMap[hc.channelId]?.thumbnailUrl
                                }
                                alt={
                                  channelMap[hc.channelId]?.title ??
                                  hc.channelId
                                }
                              />
                              <AvatarFallback className="text-[8px]">
                                {(
                                  channelMap[hc.channelId]?.title ??
                                  hc.channelId
                                ).slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate max-w-[150px]">
                              {channelMap[hc.channelId]?.title ??
                                hc.channelId.slice(0, 12) + '...'}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">金額:</span>
                          <span className="font-mono">
                            {hc.amount === 0
                              ? '無料'
                              : `¥${hc.amount.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            メッセージ:
                          </span>
                          <p className="mt-1 line-clamp-2">{hc.message}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            いいね:
                          </span>
                          <span className="font-mono">{hc.likeCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">日時:</span>
                          <span className="text-xs">
                            {formatDate(hc.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Warn</span>
                            <Switch
                              checked={hc.moderationStatus === 'warn'}
                              disabled={loading[hc.id]}
                              onCheckedChange={checked => {
                                if (checked) {
                                  handleSetModeration(hc, 'warn')
                                } else {
                                  handleRemoveModeration(hc)
                                }
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Ban</span>
                            <Switch
                              checked={hc.moderationStatus === 'ban'}
                              disabled={loading[hc.id]}
                              onCheckedChange={checked => {
                                if (checked) {
                                  handleSetModeration(hc, 'ban')
                                } else {
                                  handleRemoveModeration(hc)
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
