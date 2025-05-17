interface Props {
  name: string
  className?: string
}

export default function DisplayName({ name, className }: Props) {
  return (
    <div className={`group ${className || ''}`}>
      <span className="line-clamp-1 break-all group-hover:underline">
        {name}
      </span>
    </div>
  )
}
