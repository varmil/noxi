'use client'

import { PropsWithChildren, PropsWithoutRef, useState, type JSX } from 'react'
import { Loader2 } from 'lucide-react'
import { signOut } from 'next-auth/react'

const IconWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex justify-center items-center size-7">{children}</div>
)

type Props = {
  name: string
  icon: JSX.Element
}

export function SignOutButton({ name, icon }: PropsWithoutRef<Props>) {
  const [loading, setLoading] = useState(false)
  return (
    <div
      className={`flex items-center gap-3 py-2.5 text-muted-foreground hover:bg-accent/50 hover:text-foreground text-sm rounded-lg cursor-pointer`}
      onClick={async () => {
        setLoading(true)
        await signOut({ redirectTo: '/auth/signin' })
      }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <span className="flex-1 relative -top-[0.5px]">
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
