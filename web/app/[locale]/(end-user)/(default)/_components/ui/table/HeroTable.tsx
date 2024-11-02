import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'

export function HeroTableTitle({}: PropsWithChildren<{}>) {
  const t = useTranslations('Page.index')
  return <h2 className="text-xl font-bold mb-4">{t('section.live.ranking')}</h2>
}

export default function HeroTable({}: PropsWithChildren<{}>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Channel</TableHead>
          <TableHead className="hidden md:table-cell">Subscribers</TableHead>
          <TableHead>Live Stream</TableHead>
          <TableHead className="hidden md:table-cell">Viewers</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                width={40}
                height={40}
                alt="Channel Avatar"
                className="rounded-full"
                style={{ aspectRatio: '40/40', objectFit: 'cover' }}
              />
              <span>Vercel</span>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">1.2M</div>
          </TableCell>
          <TableCell>
            <div className="font-medium line-clamp-1">
              Introducing the frontend cloud
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">12.3K</div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                width={40}
                height={40}
                alt="Channel Avatar"
                className="rounded-full"
                style={{ aspectRatio: '40/40', objectFit: 'cover' }}
              />
              <span>Lee Robinson</span>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">250K</div>
          </TableCell>
          <TableCell>
            <div className="font-medium line-clamp-1">
              Using Vercel KV with Svelte
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">3.7K</div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                width={40}
                height={40}
                alt="Channel Avatar"
                className="rounded-full"
                style={{ aspectRatio: '40/40', objectFit: 'cover' }}
              />
              <span>Delba</span>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">80K</div>
          </TableCell>
          <TableCell>
            <div className="font-medium line-clamp-1">
              Loading UI with Next.js 13
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">1.9K</div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                width={40}
                height={40}
                alt="Channel Avatar"
                className="rounded-full"
                style={{ aspectRatio: '40/40', objectFit: 'cover' }}
              />
              <span>Acme Inc</span>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">500K</div>
          </TableCell>
          <TableCell>
            <div className="font-medium line-clamp-1">
              Building a Headless CMS with Next.js
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="text-muted-foreground">6.2K</div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
