import { getGroups } from 'apis/groups'
import HeaderNavigationMenu from './HeaderNavigationMenu'

export default async function HeaderNavigationMenuWrapper() {
  const groups = await getGroups()
  return (
    <div className="hidden md:block">
      <HeaderNavigationMenu groups={groups} />
    </div>
  )
}
