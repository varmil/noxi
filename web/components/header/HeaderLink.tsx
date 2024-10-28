import { PropsWithChildren, PropsWithoutRef } from 'react'
import { Link } from 'lib/navigation'

const IconWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex justify-center items-center h-8 w-8">{children}</div>
)

type Props = {
  name: string
  icon: JSX.Element
  href: string
  active?: boolean
}

export default function HeaderLink({
  name,
  icon,
  href,
  active
}: PropsWithoutRef<Props>) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 ${
        active ? 'text-foreground' : 'text-muted-foreground'
      } hover:text-foreground`}
      prefetch={false}
    >
      <IconWrapper>{icon}</IconWrapper>
      <span className="flex-1">{name}</span>
    </Link>
  )
}
