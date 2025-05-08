'use client'

import { PropsWithChildren, PropsWithoutRef, useState, type JSX } from 'react'
import { Loader2 } from 'lucide-react'
import { signOut } from 'next-auth/react'

const IconWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex justify-center items-center size-8">{children}</div>
)

type Props = {
  name: string
  icon: JSX.Element
  href: string
  active?: boolean
}

export function SignOutInSheet({
  name,
  icon,
  active
}: PropsWithoutRef<Omit<Props, 'href'>>) {
  const [loading, setLoading] = useState(false)
  return (
    <div
      className={`flex items-center gap-4 ${
        active ? 'text-foreground' : 'text-muted-foreground'
      } hover:text-foreground`}
      onClick={async () => {
        setLoading(true)
        await signOut({ redirectTo: '/auth/signin' })
      }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <span className="flex-1">
        {loading ? (
          <div className="flex items-center">
            <Loader2 className="size-4 animate-spin mr-2" />
            Please wait...
          </div>
        ) : (
          name
        )}
      </span>
    </div>
  )
}
