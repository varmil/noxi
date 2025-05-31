type Props = {
  title: string
  description: string | React.ReactNode
  className?: string
}

export const MutedCheerStat = ({ title, description, className }: Props) => {
  return (
    <div
      className={`min-w-[120px] rounded-lg text-center bg-muted p-3 ${className ?? ''}`}
    >
      <p className="text-xs text-muted-foreground pb-1.5">{title}</p>
      <p className="text-xl font-bold">{description}</p>
    </div>
  )
}
