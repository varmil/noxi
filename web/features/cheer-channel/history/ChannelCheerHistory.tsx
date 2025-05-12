'use client'

import { useState } from 'react'
import { Ticket, Search, Calendar, Filter, Tickets } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
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

// 応援履歴のサンプルデータ
const HistoryData = [
  {
    id: 1,
    user: { name: 'ゆきみ', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 5,
    message: 'いつも楽しい配信をありがとう！これからも応援しています！',
    date: '2025-05-08 20:15'
  },
  {
    id: 2,
    user: { name: 'そらまめ', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 1,
    message: '今日の歌枠最高でした！',
    date: '2025-05-07 18:30'
  },
  {
    id: 3,
    user: { name: 'ねこまる', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 10,
    message: '誕生日おめでとう！いつも元気をもらっています！',
    date: '2025-05-05 21:45'
  },
  {
    id: 4,
    user: { name: 'あめつち', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 3,
    message: '新衣装かわいい！',
    date: '2025-05-03 19:20'
  },
  {
    id: 5,
    user: { name: 'ほしぞら', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 2,
    message: 'これからも頑張ってください！応援しています！',
    date: '2025-05-01 22:10'
  },
  {
    id: 6,
    user: { name: 'みかづき', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 7,
    message: 'コラボ配信楽しかったです！',
    date: '2025-04-29 17:35'
  },
  {
    id: 7,
    user: { name: 'あさひ', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 4,
    message: '新曲発売おめでとう！',
    date: '2025-04-27 14:50'
  },
  {
    id: 8,
    user: { name: 'ゆうやけ', avatar: '/placeholder.svg?height=40&width=40' },
    tickets: 6,
    message: 'ゲーム実況面白かったです！',
    date: '2025-04-25 20:05'
  }
]

interface Props {
  fullPage?: boolean
}

export function ChannelCheerHistory({ fullPage = false }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = fullPage ? 8 : 5
  const t = useTranslations('Features.cheerChannel.history')

  // 検索フィルタリング
  const filteredHistory = HistoryData.filter(
    item =>
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ページネーション
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const currentItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Tickets className="mr-2 h-5 w-5 text-pink-700 dark:text-pink-500" />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {/* TODO: channel */}
            {t('description', { channel: '天音かなた' })}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="flex-1 w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t('filter')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all')}</SelectItem>
                  <SelectItem value="high">{t('high')}</SelectItem>
                  <SelectItem value="medium">{t('medium')}</SelectItem>
                  <SelectItem value="low">{t('low')}</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="recent">
                <SelectTrigger className="flex-1 w-[140px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t('period')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">{t('recent')}</SelectItem>
                  <SelectItem value="week">{t('week')}</SelectItem>
                  <SelectItem value="month">{t('month')}</SelectItem>
                  <SelectItem value="all">{t('all')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('user')}</TableHead>
                  <TableHead>{t('tickets')}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t('message')}
                  </TableHead>
                  <TableHead>{t('date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={item.user.avatar || '/placeholder.svg'}
                              alt={item.user.name}
                            />
                            <AvatarFallback>
                              {item.user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{item.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`flex w-16 items-center justify-between ${
                            item.tickets >= 5
                              ? 'border-pink-200 bg-pink-100/50 dark:border-pink-800 dark:bg-pink-950/50'
                              : ''
                          }`}
                        >
                          <Tickets className="mr-1 size-3 text-pink-700 dark:text-pink-500" />
                          {item.tickets}枚
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden max-w-xs truncate md:table-cell">
                        {item.message}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {new Date(item.date).toLocaleString('ja-JP', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      {t('noResults')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredHistory.length > itemsPerPage && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      setCurrentPage(prev => Math.max(prev - 1, 1))
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        setCurrentPage(i + 1)
                      }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(totalPages)
                        }}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      setCurrentPage(prev => Math.min(prev + 1, totalPages))
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
