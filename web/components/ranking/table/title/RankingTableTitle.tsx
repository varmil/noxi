import { PropsWithChildren } from 'react'

export function RankingTableTitleContainer({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`flex ${className || ''}`}>
      <div className="flex flex-col gap-y-2 sm:w-full sm:flex-row sm:justify-between sm:items-center sm:gap-x-8">
        {children}
      </div>
    </section>
  )
}

export function RankingTableTitleH1({
  title,
  className
}: {
  title: string
  className?: string
}) {
  return (
    <h1
      title={title}
      className={`flex items-center text-lg sm:text-xl font-bold ${
        className || ''
      }`}
      aria-label={title}
    >
      <div className="flex gap-x-1 sm:gap-x-2 items-center">
        <span className="tracking-tighter line-clamp-2 [word-break:auto-phrase]">
          {title}
        </span>
      </div>
    </h1>
  )
}

export function RankingTableTitleDescription({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`text-sm text-muted-foreground ${className || ''}`}>
      {children}
    </div>
  )
}
