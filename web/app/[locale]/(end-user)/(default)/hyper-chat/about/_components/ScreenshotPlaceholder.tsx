import { ImageIcon } from 'lucide-react'

type Props = {
  label: string
}

export default function ScreenshotPlaceholder({ label }: Props) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50 p-8">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <ImageIcon className="size-8" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  )
}
