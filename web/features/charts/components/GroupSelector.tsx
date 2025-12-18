'use client'

import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GroupsSchema } from 'apis/groups/groupSchema'

interface Props {
  value: string | undefined
  onChange: (value: string | undefined) => void
  groups: GroupsSchema
}

export function GroupSelector({ value, onChange, groups }: Props) {
  const t = useTranslations('Features.charts.filter')

  const handleChange = (newValue: string) => {
    onChange(newValue === 'all' ? undefined : newValue)
  }

  return (
    <Select value={value ?? 'all'} onValueChange={handleChange}>
      <SelectTrigger className="flex-1 w-[156px] sm:max-w-[190px]">
        <SelectValue placeholder={t('allGroups')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t('allGroups')}</SelectItem>
        {groups.map(group => (
          <SelectItem key={group.id} value={group.id}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
