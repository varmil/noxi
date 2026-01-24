'use client'

import { useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GroupSchema } from 'apis/groups'
import { usePathname, useRouter } from 'lib/navigation'

type Props = {
  groups: GroupSchema[]
  currentGroup?: string
  allGroupsLabel: string
}

export default function GroupFilterBar({
  groups,
  currentGroup,
  allGroupsLabel
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('group')
    } else {
      params.set('group', value)
    }
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <div className="mb-10">
      <Select value={currentGroup ?? 'all'} onValueChange={handleChange}>
        <SelectTrigger className="w-full sm:w-[240px]">
          <SelectValue placeholder={allGroupsLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allGroupsLabel}</SelectItem>
          {groups.map(group => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
