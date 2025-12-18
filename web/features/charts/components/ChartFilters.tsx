'use client'

import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { GroupsSchema } from 'apis/groups/groupSchema'
import { useRouter } from 'lib/navigation'
import {
  ChartFilterParams,
  DaysOption,
  DEFAULT_DAYS
} from '../types/chart-filter'
import { DaysSelector } from './DaysSelector'
import { GroupSelector } from './GroupSelector'

interface Props {
  groups: GroupsSchema
}

export function ChartFilters({ groups }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const days = (Number(searchParams.get('days')) || DEFAULT_DAYS) as DaysOption
  const group = searchParams.get('group') ?? undefined

  const updateParams = useCallback(
    (updates: Partial<ChartFilterParams>) => {
      const params = new URLSearchParams(searchParams.toString())

      if (updates.days !== undefined) {
        params.set('days', String(updates.days))
      }
      if ('group' in updates) {
        if (updates.group) {
          params.set('group', updates.group)
        } else {
          params.delete('group')
        }
      }

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
      <DaysSelector
        value={days}
        onChange={newDays => updateParams({ days: newDays })}
      />
      <div className="flex-1 flex">
        <GroupSelector
          value={group}
          onChange={newGroup => updateParams({ group: newGroup })}
          groups={groups}
        />
      </div>
    </div>
  )
}
