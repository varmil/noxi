import { Button } from '@/components/ui/button'

export const DrawerSelectButton = ({
  active,
  asChild,
  children
}: React.PropsWithChildren<{ active?: boolean; asChild?: boolean }>) => {
  const bg = active ? ' bg-accent ' : ''
  return (
    <Button
      asChild={asChild}
      variant="ghost"
      className={`rounded-none justify-start w-full ${bg}`}
    >
      {children}
    </Button>
  )
}
