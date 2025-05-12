interface Props {
  name: string
  className?: string
}

export default function UserName({ name, className }: Props) {
  return (
    <div className={`group ${className || ''}`}>
      <span className="line-clamp-1 break-all group-hover:underline">
        {name}
      </span>
    </div>
  )
}
