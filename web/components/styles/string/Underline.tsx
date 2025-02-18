import { PropsWithChildren } from 'react'

export default function Underline({ children }: PropsWithChildren) {
  return (
    <span className="inline-block underline underline-offset-4 decoration-1 decoration-muted-foreground hover:scale-110">
      {children}
    </span>
  )
}
