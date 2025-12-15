'use client'

import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { GroupSchema } from 'apis/groups'

interface GroupSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  groups: GroupSchema[]
}

export function GroupSelect({
  value,
  onValueChange,
  placeholder,
  groups
}: GroupSelectProps) {
  const t = useTranslations('Global.group')

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {groups.map(group => (
          <SelectItem key={group.id} value={group.id}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
