import { PropsWithChildren } from 'react'

export function HeroH2({ children }: PropsWithChildren<{}>) {
  return (
    <h2 className="font-bold tracking-tight text-pretty text-4xl lg:text-[45px] 2xl:text-6xl/none">
      {children}
    </h2>
  )
}

export function HeroH3({ children }: PropsWithChildren<{}>) {
  return (
    <h3 className="font-bold tracking-tight text-balance text-3xl sm:text-5xl xl:text-6xl/none">
      {children}
    </h3>
  )
}
