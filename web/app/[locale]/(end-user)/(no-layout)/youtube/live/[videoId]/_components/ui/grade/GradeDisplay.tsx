'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// グレードの計算関数
const calculateGrade = (percentage: number): string => {
  if (percentage <= 0.1) return 'SS+'
  if (percentage <= 1) return 'SS'
  if (percentage <= 5) return 'S+'
  if (percentage <= 10) return 'S'
  if (percentage <= 25) return 'A'
  if (percentage <= 50) return 'B'
  return 'C'
}

// グレードの色を決定する関数
const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'SS+':
      return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
    case 'SS':
      return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
    case 'S+':
      return 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
    case 'S':
      return 'bg-blue-600 text-white'
    case 'A':
      return 'bg-green-600 text-white'
    case 'B':
      return 'bg-yellow-600 text-white'
    case 'C':
      return 'bg-gray-600 text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}

// グレード範囲の定義
const GRADE_RANGES = [
  { grade: 'SS+', min: '0.0', max: '0.1' },
  { grade: 'SS', min: '0.1', max: '1.0' },
  { grade: 'S+', min: '1.0', max: '5.0' },
  { grade: 'S', min: '5.0', max: '10.0' },
  { grade: 'A', min: '10.0', max: '25.0' },
  { grade: 'B', min: '25.0', max: '50.0' },
  { grade: 'C', min: '50.0', max: '100.0' }
]

// サンプルデータ
const sampleData = {
  videoId: 'g8ixGHBy9ls',
  title: '【雑談】今日も元気にお話しましょう！',
  thumbnail: '/placeholder.svg?height=720&width=1280',
  rankings: [
    { category: '総合', rank: 1234, percentage: 0.06 },
    { category: '男性', rank: 634, percentage: 12.6 },
    { category: 'にじさんじ', rank: 234, percentage: 1.6 }
  ]
}

export default function GradeDisplay({ className }: { className?: string }) {
  const [data] = useState(sampleData)

  // メインのパーセンテージ（総合カテゴリを使用）
  const mainPercentage = data.rankings[0].percentage
  const grade = calculateGrade(mainPercentage)
  const gradeColor = getGradeColor(grade)

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="text-center">
            <h2 className="text-lg lg:text-xl font-bold mb-4">
              スパチャグレード
            </h2>
            <div
              className={`text-box-trim text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight py-6 px-18 rounded-lg ${gradeColor}`}
            >
              {grade}
            </div>
            <p className="mt-2 text-lg">Top {mainPercentage}%</p>
            <div className="mt-4 text-xs text-muted-foreground max-w-xs mx-auto">
              <p>PeakX AIによる参考値です</p>
            </div>
          </div>

          <Tabs defaultValue="rankings" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rankings">ランキング</TabsTrigger>
              <TabsTrigger value="grades">グレード表</TabsTrigger>
            </TabsList>
            <TabsContent value="rankings" className="mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>カテゴリ</TableHead>
                    <TableHead className="text-right">順位</TableHead>
                    <TableHead className="text-right">Top X%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rankings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        {item.rank.toLocaleString()}位
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={getGradeColor(
                            calculateGrade(item.percentage)
                          )}
                        >
                          {item.percentage}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="grades" className="mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>グレード</TableHead>
                    <TableHead className="text-right">
                      パーセンテージ範囲
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {GRADE_RANGES.map(item => (
                    <TableRow key={item.grade}>
                      <TableCell>
                        <Badge className={`${getGradeColor(item.grade)}`}>
                          {item.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums whitespace-nowrap">
                        {item.max.padStart(5, ' ')}% -{' '}
                        {item.min.padStart(5, ' ')}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground pt-4">
                <p>
                  この評価はPeakX独自のアルゴリズムによる参考値であり、チャンネルの絶対的な価値や収益性を保証するものではありません。
                </p>
                <p>
                  ライブ中のスーパーチャット、スーパーステッカーの合計金額をもとに算出しています。
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
