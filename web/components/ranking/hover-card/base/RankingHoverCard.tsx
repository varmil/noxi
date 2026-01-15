import { PropsWithChildren } from 'react'
import { useFormatter } from 'next-intl'
import dayjs from 'lib/dayjs'

export const PopoverDate = ({ date }: { date: dayjs.ConfigType }) => {
  const format = useFormatter()
  return (
    <div className="text-muted-foreground underline decoration-1 underline-offset-4 decoration-dashed decoration-slate-400 decoration">
      {format.dateTime(dayjs(date).toDate(), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
      })}
    </div>
  )
}

export const Title = ({ children }: PropsWithChildren) => (
  <h4 className="">{children}</h4>
)

export const Items = ({ children }: PropsWithChildren) => (
  <div className="space-y-4">{children}</div>
)

export const Item = ({ children }: PropsWithChildren) => (
  <div className="space-y-2">{children}</div>
)

export const ItemTitle = ({ children }: PropsWithChildren) => (
  <h5 className="font-semibold">{children}</h5>
)

export const ItemDescription = ({ children }: PropsWithChildren) => (
  <div className="rounded-md bg-muted px-3 py-2 text-center">{children}</div>
)

export const DatetimeContainer = ({ children }: PropsWithChildren) => (
  <div className="grid grid-cols-[4rem_1fr] gap-2">{children}</div>
)

export const Datetime = ({ date }: { date: dayjs.ConfigType }) => {
  const format = useFormatter()
  return (
    <div>
      {format.dateTime(dayjs(date).toDate(), {
        dateStyle: 'medium',
        timeStyle: 'short'
      })}
    </div>
  )
}
