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

export default function ChannelsRankingGallerySkeleton() {
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
            <TableHead className="text-nowrap text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableHead>
            <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
              <Skeleton className="h-4 w-10 mx-auto" />
            </TableHead>
            <TableHead className="hidden @3xl:table-cell text-nowrap text-center">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableHead>
            <TableHead className="@3xl:hidden" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: ROWS }).map((_, i) => (
            <TableRow key={i} className="h-[56.8px]">
              {/* Rank */}
              <TableCell className="min-w-2 max-w-16 py-1">
                <Skeleton className="h-6 w-6 mx-auto" />
              </TableCell>

              {/* Channel Thumbnail */}
              <TableCell className="text-center">
                <Skeleton className="size-8 rounded-full" />
              </TableCell>

              {/* Channel Title */}
              <TableCell>
                <Skeleton className="h-5 w-32 sm:w-48" />
              </TableCell>

              {/* Dimension (SuperChat or Subscribers) */}
              <TableCell className="min-w-[98px] max-w-[180px]">
                <Skeleton className="h-5 w-16 ml-auto" />
              </TableCell>

              {/* Group */}
              <TableCell className="hidden @3xl:table-cell">
                <Skeleton className="h-5 w-12 mx-auto" />
              </TableCell>

              {/* Country */}
              <TableCell className="hidden @3xl:table-cell">
                <Skeleton className="h-5 w-8 mx-auto" />
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
