'use client'

import { notFound, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { GroupsSchema } from 'apis/groups'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import Image from 'components/styles/Image'
import { usePathname } from 'lib/navigation'
import { getIcon, isIcon } from 'utils/group'

const RESET_KEYS = {
  page: null
}

type Props = {
  groups: GroupsSchema
}

export default function GroupColumn({ groups }: Props) {
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
          isActive={() => groupParam === 'all'}
          activeVariant="secondary"
        >
          {tg('group.all')}
        </SelectButton>

        {groups.map(group => (
          <SelectButton
            key={group.id}
            className="gap-x-2"
            qs={{ ...RESET_KEYS }}
            pathname={`${pathname.replace(groupParam as string, group.id)}`}
            isActive={() => groupParam === group.id}
            activeVariant="secondary"
          >
            <span className="flex size-4 shrink-0 items-center justify-center">
              {isIcon(group) ? (
                (() => {
                  const Icon = getIcon(group)
                  return <Icon className="size-4" />
                })()
              ) : (
                <Image
                  src={group.iconSrc}
                  alt={''}
                  width={100}
                  height={100}
                  className="size-4 rounded-full"
                />
              )}
            </span>
            <span>{group.name}</span>
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
