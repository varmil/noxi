import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getChannel } from 'apis/youtube/getChannel'
import { getStream } from 'apis/youtube/getStream'
import { getSupersBundleRank } from 'apis/youtube/getSupersBundleRank'
import Underline from 'components/styles/string/Underline'
import { StreamRankingPagination } from 'config/constants/Pagination'
import { GradeString } from 'features/grade/types/grade'
import { calculateGrade, getGradeColor } from 'features/grade/utils/grade'
import GradeDisplayCard from './GradeDisplayCard'
import LinkCell from './LinkCell'

// グレード範囲の定義
const GRADE_RANGES = [
  { grade: 'SS+', min: '0.0', max: '0.1' },
  { grade: 'SS', min: '0.1', max: '1.0' },
  { grade: 'S+', min: '1.0', max: '5.0' },
  { grade: 'S', min: '5.0', max: '10.0' },
  { grade: 'A', min: '10.0', max: '25.0' },
  { grade: 'B', min: '25.0', max: '50.0' },
  { grade: 'C', min: '50.0', max: '100.0' }
] satisfies { grade: GradeString; min: string; max: string }[]

export default async function GradeDisplay({
  videoId,
  className
}: {
  videoId: string
  className?: string
}) {
  const [
    global,
    comp,
    feat,
    stream,
    supersBundleOverallRank,
    supersBundleGenderRank,
    supersBundleGroupRank
  ] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Components.ranking.base'),
    getTranslations('Features.grade'),
    getStream(videoId),
    getSupersBundleRank({
      videoId,
      rankingType: 'overall'
    }),
    getSupersBundleRank({
      videoId,
      rankingType: 'gender'
    }),
    getSupersBundleRank({
      videoId,
      rankingType: 'group'
    })
  ])

  const {
    snippet: { channelId }
  } = stream
  const { peakX } = await getChannel(channelId)

  const data = {
    videoId,
    rankings: [
      {
        category: comp('overall'),
        asPath: '/ranking/super-chat/live/all/all',
        rank: supersBundleOverallRank?.rank,
        percentage: supersBundleOverallRank?.topPercentage
      },
      {
        category: global(`gender.${peakX.gender}`),
        asPath: `/ranking/super-chat/live/all/all?gender=${peakX.gender}`,
        rank: supersBundleGenderRank?.rank,
        percentage: supersBundleGenderRank?.topPercentage
      },
      {
        category: global(`group.${peakX.group}`),
        asPath: `/ranking/super-chat/live/${peakX.group}/all`,
        rank: supersBundleGroupRank?.rank,
        percentage: supersBundleGroupRank?.topPercentage
      }
    ]
  }

  // メインのパーセンテージ（総合カテゴリを使用）
  const mainPercentage = data.rankings[0].percentage
  const grade = calculateGrade(mainPercentage)
  const gradeColor = getGradeColor(grade)

  return (
    <GradeDisplayCard className={className}>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-center">
          <h2 className="text-lg lg:text-xl font-bold mb-4">
            {feat('supersGrade')}
          </h2>
          <div
            className={`text-box-trim text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight py-6 px-14 lg:px-18 rounded-lg ${gradeColor}`}
          >
            {grade}
          </div>
          {mainPercentage ? (
            <p className="mt-2 text-lg">
              {feat('top')} {mainPercentage.toFixed(1)}%
            </p>
          ) : null}
          <div className="mt-4 text-xs text-muted-foreground max-w-xs mx-auto">
            <p>{feat('notice1')}</p>
          </div>
        </div>

        <Tabs defaultValue="rankings" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="cursor-pointer" value="rankings">
              {comp('name')}
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="grades">
              {feat('gradesTable')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="rankings" className="mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{comp('rankingType')}</TableHead>
                  <TableHead className="text-right">{comp('rank')}</TableHead>
                  <TableHead className="text-right">{feat('top')} X%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rankings.map((item, index) => (
                  <TableRow key={index}>
                    <LinkCell href={item.asPath}>
                      <Underline>{item.category}</Underline>
                    </LinkCell>
                    {item.rank ? (
                      <LinkCell
                        href={item.asPath}
                        page={StreamRankingPagination.getPageFromRank(
                          item.rank
                        )}
                        className="text-right"
                      >
                        <Underline>
                          {item.rank.toLocaleString()}
                          <span className="text-xs text-muted-foreground">
                            {global(`ranking.place`, { rank: item.rank })}
                          </span>
                        </Underline>
                      </LinkCell>
                    ) : (
                      <TableCell className="text-right text-muted-foreground">
                        {comp('unranked')}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      {item.percentage ? (
                        <Badge
                          variant="outline"
                          className={getGradeColor(
                            calculateGrade(item.percentage)
                          )}
                        >
                          {item.percentage.toFixed(1)}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">---</span>
                      )}
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
                  <TableHead>{feat('name')}</TableHead>
                  <TableHead className="text-right">
                    {feat('percentageRange')}
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
                      {item.max.padStart(5, ' ')}% - {item.min.padStart(5, ' ')}
                      %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground pt-4">
              <p>{feat('notice2')}</p>
              <p>{feat('supers.notice1')}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GradeDisplayCard>
  )
}
