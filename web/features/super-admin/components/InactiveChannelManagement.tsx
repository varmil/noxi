'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Trash2, Users } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { deleteChannel } from 'apis/inactive-channels/deleteChannel'
import { InactiveChannelsSchema } from 'apis/inactive-channels/inactiveChannelSchema'
import Image from 'components/styles/Image'
import { useRouter } from 'lib/navigation'

type Channel = InactiveChannelsSchema[number]

type Props = {
  initialChannels: InactiveChannelsSchema
  initialMonths: number
}

export function InactiveChannelManagement({
  initialChannels,
  initialMonths
}: Props) {
  const router = useRouter()
  const [channels, setChannels] = useState<Channel[]>(initialChannels)
  const [selectedMonths, setSelectedMonths] = useState(initialMonths.toString())

  // initialChannels が変わったら state を更新
  useEffect(() => {
    setChannels(initialChannels)
  }, [initialChannels])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [channelToDelete, setChannelToDelete] = useState<Channel | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const periodOptions = [
    { value: '3', label: '3ヶ月' },
    { value: '6', label: '6ヶ月' },
    { value: '9', label: '9ヶ月' },
    { value: '12', label: '12ヶ月' },
    { value: '18', label: '18ヶ月' },
    { value: '24', label: '24ヶ月' },
    { value: '36', label: '36ヶ月' }
  ]

  const handlePeriodChange = (value: string) => {
    setSelectedMonths(value)
    router.push(`?months=${value}`)
    router.refresh()
  }

  const handleDeleteClick = (channel: Channel) => {
    setChannelToDelete(channel)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!channelToDelete) return

    setIsDeleting(true)
    try {
      await deleteChannel(channelToDelete.id)
      setChannels(prev => prev.filter(ch => ch.id !== channelToDelete.id))
      toast.success('チャンネルを完全に削除しました', {
        description: channelToDelete.title
      })
    } catch (error) {
      toast.error('削除に失敗しました', {
        description: error instanceof Error ? error.message : '不明なエラー'
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setChannelToDelete(null)
    }
  }

  const formatSubscribers = (count: number) => {
    return count.toLocaleString('ja-JP')
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '配信記録なし'

    try {
      const date = new Date(dateString)
      // タイムゾーンを明示してハイドレーションエラーを回避
      return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Tokyo'
      }).format(date)
    } catch {
      return '配信記録なし'
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-2xl">休止チャンネル管理</CardTitle>
              <CardDescription className="mt-2">
                長期間配信がないチャンネルを管理します
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="period-select"
                className="text-sm font-medium whitespace-nowrap"
              >
                休止期間:
              </label>
              <Select value={selectedMonths} onValueChange={handlePeriodChange}>
                <SelectTrigger id="period-select" className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              該当チャンネル数: {channels.length}
            </Badge>
          </div>

          {channels.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">該当するチャンネルはありません</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">サムネイル</TableHead>
                      <TableHead>チャンネル名</TableHead>
                      <TableHead>グループ</TableHead>
                      <TableHead className="text-right">登録者数</TableHead>
                      <TableHead>最終配信日</TableHead>
                      <TableHead className="w-[120px] text-right">
                        アクション
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channels.map(channel => (
                      <TableRow key={channel.id}>
                        <TableCell>
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                            {channel.thumbnailUrl ? (
                              <Image
                                src={channel.thumbnailUrl}
                                alt={channel.title}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                <Users className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{channel.title}</span>
                            <a
                              href={`https://youtube.com/channel/${channel.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{channel.group}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatSubscribers(channel.subscriberCount)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              channel.lastStreamDate
                                ? 'text-foreground'
                                : 'text-muted-foreground italic'
                            }
                          >
                            {formatDate(channel.lastStreamDate)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(channel)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            完全削除
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {channels.map(channel => (
                  <Card key={channel.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden bg-muted">
                          {channel.thumbnailUrl ? (
                            <Image
                              src={channel.thumbnailUrl}
                              alt={channel.title}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                              <Users className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <h3 className="font-semibold text-base leading-tight truncate flex-1">
                              {channel.title}
                            </h3>
                            <a
                              href={`https://youtube.com/channel/${channel.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <div className="space-y-2">
                            <Badge variant="outline" className="text-xs">
                              {channel.group}
                            </Badge>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  登録者数:
                                </span>
                                <span className="font-mono font-medium">
                                  {formatSubscribers(channel.subscriberCount)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  最終配信:
                                </span>
                                <span
                                  className={
                                    channel.lastStreamDate
                                      ? 'text-foreground'
                                      : 'text-muted-foreground italic'
                                  }
                                >
                                  {formatDate(channel.lastStreamDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => handleDeleteClick(channel)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            完全削除
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              チャンネルを完全に削除しますか？
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                以下のチャンネルを完全に削除します。この操作は元に戻せません。
              </p>
              {channelToDelete && (
                <p className="font-semibold text-foreground mt-2">
                  {channelToDelete.title}
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? '削除中...' : '完全削除'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
