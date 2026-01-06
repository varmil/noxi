import { getGroups } from 'apis/groups'
import HeaderNavigationMenu from './HeaderNavigationMenu'

export default async function HeaderNavigationMenuWrapper() {
  const groups = await getGroups()
  return (
    <div className="hidden md:flex md:items-center">
      <HeaderNavigationMenu groups={groups} />
    </div>
  )
}
