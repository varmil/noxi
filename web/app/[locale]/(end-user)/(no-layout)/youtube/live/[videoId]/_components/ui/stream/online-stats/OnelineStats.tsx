import { PropsWithChildren } from 'react'

export default function OnelineStats({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center text-sm sm:text-base text-muted-foreground space-x-1.5 bg-muted px-4 py-2 rounded-xl">
      {children}
    </div>
  )
}

export function OnelineStatsContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap gap-2 sm:gap-4">{children}</div>
}
