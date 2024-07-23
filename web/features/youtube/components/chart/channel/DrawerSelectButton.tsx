import { Button } from '@/components/ui/button'

export const DrawerSelectButton = ({
  active,
  children
}: React.PropsWithChildren<{ active?: boolean }>) => {
  const bg = active ? ' bg-accent ' : ''
  return (
    <Button variant="ghost" className={`justify-start w-full ${bg}`}>
      {children}
    </Button>
  )
}
