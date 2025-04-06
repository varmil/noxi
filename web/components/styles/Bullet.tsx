import { PropsWithoutRef } from 'react'

export default function Bullet({
  weak,
  className
}: PropsWithoutRef<{ weak?: boolean; className?: string }>) {
  return (
    <span
      className={`mx-0.5 sm:mx-1 ${weak ? 'text-muted-foreground' : ''} ${
        className || ''
      }`}
    >
      •
    </span>
  )
}
