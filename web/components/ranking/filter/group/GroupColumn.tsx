'use client'

import { useState } from 'react'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import Image from 'components/styles/Image'
import useGroups from 'hooks/useGroups'

export default function GroupColumn() {
  const groups = useGroups()
  const [selectedGroup, setGroup] = useState('all')

  return (
    <Column>
      <ColumnHeader>グループ</ColumnHeader>
      <ColumnContent>
        <SelectButton
          variant={selectedGroup === 'all' ? 'secondary' : 'ghost'}
          onClick={() => setGroup('all')}
        >
          すべて
        </SelectButton>

        {groups.imgs.map(group => (
          <SelectButton
            key={group.id}
            className="gap-x-2"
            variant={selectedGroup === group.id ? 'secondary' : 'ghost'}
            onClick={() => setGroup(group.id)}
          >
            <Image
              src={group.src}
              alt={group.name}
              width={100}
              height={100}
              className="h-4 w-4 rounded-full"
            />
            <span className="">{group.name}</span>
          </SelectButton>
        ))}

        {groups.icons.map(group => (
          <SelectButton
            key={group.id}
            className="gap-x-2"
            variant={selectedGroup === group.id ? 'secondary' : 'ghost'}
            onClick={() => setGroup(group.id)}
          >
            <group.icon className="h-4 w-4 rounded-full" />
            <span className="">{group.name}</span>
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
