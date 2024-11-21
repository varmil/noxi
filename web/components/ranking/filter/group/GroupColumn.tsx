import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import Image from 'components/styles/Image'
import useGroups from 'hooks/useGroups'

const QS_KEY = 'group'

export default function GroupColumn() {
  const groups = useGroups()

  return (
    <Column>
      <ColumnHeader>グループ</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="all"
          activeVariant="secondary"
          defaultActive
        >
          すべて
        </SelectButton>

        {groups.imgs.map(group => (
          <SelectButton
            key={group.id}
            className="gap-x-2"
            qsKey={QS_KEY}
            qsValue={group.id}
            activeVariant="secondary"
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
            qsKey={QS_KEY}
            qsValue={group.id}
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
