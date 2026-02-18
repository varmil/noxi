'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import { Link, usePathname } from 'lib/navigation'
import { searchTalents } from '../actions/searchTalentsActions'

type Props = {
  className?: string
  /** 検索結果をドロップダウンとして表示（ヘッダー用） */
  dropdown?: boolean
}
export function TalentSearch({ className, dropdown }: Props) {
  const [query, setQuery] = React.useState('')
  const [debouncedQuery] = useDebounce(query, 500)
  const [talents, setTalents] = React.useState<ChannelsSchema>([])
  const [loading, setLoading] = React.useState(false)
  const queryIsLongEnough = debouncedQuery.length >= 2
  const pathname = usePathname()

  // パス変更時に状態をリセット
  React.useEffect(() => {
    setQuery('')
    setTalents([])
  }, [pathname])

  React.useEffect(() => {
    const fetchTalents = async () => {
      if (!queryIsLongEnough) {
        setTalents([])
        return
      }
      setLoading(true)
      try {
        const results = await searchTalents(debouncedQuery)
        setTalents(results)
      } catch (error) {
        console.error('検索エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTalents()
  }, [debouncedQuery, queryIsLongEnough])

  const showList =
    loading || (queryIsLongEnough && talents.length === 0) || talents.length > 0

  return (
    <Command
      className={cn(
        'rounded-lg border shadow-md',
        dropdown && 'relative overflow-visible',
        className
      )}
      shouldFilter={false}
      defaultValue={'-'}
    >
      <CommandInput
        placeholder="YouTubeチャンネル名を入力..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList
        className={cn(
          'max-h-[330px]',
          dropdown &&
            'absolute top-full left-0 right-0 z-50 rounded-md border bg-popover shadow-md',
          dropdown && !showList && 'hidden'
        )}
      >
        {loading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {!loading && queryIsLongEnough && !talents.length && (
          <section className="flex flex-col items-center gap-2 p-4 text-sm text-muted-foreground">
            <span>該当するチャンネルが見つかりませんでした</span>
            <Link
              href="/channels/add"
              className="underline underline-offset-4 hover:text-primary"
            >
              チャンネルを新規追加する
            </Link>
          </section>
        )}
        <CommandItem value="-" className="hidden" />

        {talents.length ? (
          <CommandGroup heading="検索結果">
            {talents.map(talent => {
              return <Item key={talent.basicInfo.id} talent={talent} />
            })}
          </CommandGroup>
        ) : null}
      </CommandList>
    </Command>
  )
}

const Item = ({ talent }: { talent: ChannelsSchema[number] }) => {
  const {
    basicInfo: { id, title, thumbnails },
    peakX
  } = talent
  return (
    <CommandItem
      key={id}
      value={id}
      className="flex items-center gap-2 py-2 cursor-pointer"
      asChild
    >
      <Link href={`/${peakX.group}/channels/${id}`}>
        <Avatar className="size-7">
          <AvatarImage
            src={thumbnails?.default?.url || '/placeholder.svg'}
            alt={title}
          />
          <AvatarFallback>{title.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs font-medium line-clamp-1 break-all">
            {title}
          </span>
          <span className="text-xs text-muted-foreground">{peakX.group}</span>
        </div>
      </Link>
    </CommandItem>
  )
}
