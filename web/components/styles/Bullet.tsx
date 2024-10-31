import { PropsWithoutRef } from 'react'

export default function Bullet({ weak }: PropsWithoutRef<{ weak?: boolean }>) {
  return (
    <span className={`mx-0.5 sm:mx-1 ${weak ? 'text-muted-foreground' : ''}`}>
      •
    </span>
  )
}
