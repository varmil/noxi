import { PropsWithChildren } from 'react'

export function HeroH1({ children }: PropsWithChildren<{}>) {
  return (
    <h1 className="font-bold tracking-tight text-pretty text-3xl sm:text-5xl xl:text-6xl/none">
      {children}
    </h1>
  )
}

export function HeroH3({ children }: PropsWithChildren<{}>) {
  return (
    <h3 className="font-bold tracking-tight text-3xl sm:text-5xl xl:text-6xl/none">
      {children}
    </h3>
  )
}
