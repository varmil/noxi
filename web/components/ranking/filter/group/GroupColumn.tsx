'use client'

import { notFound, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import Image from 'components/styles/Image'
import useGroups from 'hooks/useGroups'
import { usePathname } from 'lib/navigation'

const RESET_KEYS = {
  page: null
}

type Props = {
  pathname: string
}

export default function GroupColumn({}: Props) {
  const groups = useGroups()
  const pathname = usePathname()
  const { group: groupParam } = useParams()
  const tg = useTranslations('Global.ranking')

  if (!groupParam) {
    return notFound()
  }

  return (
    <Column>
      <ColumnHeader>{tg('filter.group')}</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qs={{ ...RESET_KEYS }}
          pathname={`${pathname.replace(groupParam as string, 'all')}`}
          activeVariant="secondary"
        >
          {tg('group.all')}
        </SelectButton>

        {groups.imgs.map(group => (
          <SelectButton
            key={group.id}
            className="gap-x-2"
            qs={{ ...RESET_KEYS }}
            pathname={`${pathname.replace(groupParam as string, group.id)}`}
            activeVariant="secondary"
          >
            <Image
              src={group.src}
              alt={''}
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
            qs={{ ...RESET_KEYS }}
            pathname={`${pathname.replace(groupParam as string, group.id)}`}
            activeVariant="secondary"
          >
            <group.icon className="h-4 w-4 rounded-full" />
            <span className="">{group.name}</span>
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
