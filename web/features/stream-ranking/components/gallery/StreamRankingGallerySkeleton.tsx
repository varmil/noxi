import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const ROWS = 20

export default function StreamRankingGallerySkeleton() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 text-nowrap" />
            <TableHead className="text-center" />
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="text-nowrap">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead />
            <TableHead className="text-nowrap">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
              <Skeleton className="h-4 w-10 mx-auto" />
            </TableHead>
            <TableHead className="@3xl:hidden" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: ROWS }).map((_, i) => (
            <TableRow key={i} className="h-[56.8px]">
              {/* Rank */}
              <TableCell className="min-w-2 max-w-16">
                <Skeleton className="h-6 w-6 mx-auto" />
              </TableCell>

              {/* Channel Thumbnail */}
              <TableCell className="text-center @max-md:z-10 @max-md:sticky @max-md:bg-background @max-md:left-0">
                <Skeleton className="size-8 rounded-full" />
              </TableCell>

              {/* Channel Title */}
              <TableCell className="min-w-[152px]">
                <Skeleton className="h-5 w-32" />
              </TableCell>

              {/* Dimension (Concurrent Viewers or SuperChat) */}
              <TableCell className="min-w-24">
                <Skeleton className="h-5 w-16" />
              </TableCell>

              {/* Stream Thumbnail */}
              <TableCell>
                <Skeleton className="w-20 aspect-video rounded" />
              </TableCell>

              {/* Stream Title */}
              <TableCell className="min-w-[240px]">
                <Skeleton className="h-5 w-48" />
              </TableCell>

              {/* Group */}
              <TableCell className="hidden @3xl:table-cell">
                <Skeleton className="h-5 w-12 mx-auto" />
              </TableCell>

              {/* Link Icon */}
              <TableCell className="min-w-[32px] @3xl:hidden">
                <Skeleton className="h-4 w-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <div className="flex justify-center">
        <Skeleton className="h-9 w-64" />
      </div>
    </>
  )
}
