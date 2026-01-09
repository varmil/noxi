import HeaderNavigationMenu from './HeaderNavigationMenu'

export default async function HeaderNavigationMenuWrapper() {
  // const groups = await getGroups()
  return (
    <div className="hidden flex-1 md:flex">
      <HeaderNavigationMenu />
    </div>
  )
}
