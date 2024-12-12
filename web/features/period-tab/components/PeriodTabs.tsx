'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import dayjs from 'lib/dayjs'

type DateRange = '7days' | '30days' | '1year'

export default function PeriodTabs() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('30days')
  const [startDate, setStartDate] = useState(
    dayjs().subtract(30, 'day').toDate()
  )
  const [endDate, setEndDate] = useState(dayjs().toDate())

  useEffect(() => {
    const now = dayjs()
    switch (selectedRange) {
      case '7days':
        setStartDate(now.subtract(7, 'day').toDate())
        setEndDate(now.toDate())
        break
      case '30days':
        setStartDate(now.subtract(30, 'day').toDate())
        setEndDate(now.toDate())
        break
      case '1year':
        setStartDate(now.subtract(1, 'year').toDate())
        setEndDate(now.toDate())
        break
    }
  }, [selectedRange])

  const formatDateRange = (start: Date, end: Date) => {
    return `${dayjs(start).format('YYYY/MM/DD')} - ${dayjs(end).format(
      'YYYY/MM/DD'
    )}`
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs
          defaultValue="30days"
          onValueChange={value => setSelectedRange(value as DateRange)}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="7days">過去7日間</TabsTrigger>
              <TabsTrigger value="30days">過去30日間</TabsTrigger>
              <TabsTrigger value="1year">過去1年間</TabsTrigger>
            </TabsList>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange(startDate, endDate)}
            </div>
          </div>
          <TabsContent value="7days">
            <DateRangeContent start={startDate} end={endDate} />
          </TabsContent>
          <TabsContent value="30days">
            <DateRangeContent start={startDate} end={endDate} />
          </TabsContent>
          <TabsContent value="1year">
            <DateRangeContent start={startDate} end={endDate} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function DateRangeContent({ start, end }: { start: Date; end: Date }) {
  return (
    <div className="flex justify-between items-center">
      <span>{dayjs(start).format('YYYY/MM/DD')}</span>
      <span className="mx-2">-</span>
      <span>{dayjs(end).format('YYYY/MM/DD')}</span>
    </div>
  )
}
