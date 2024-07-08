import { PropsWithChildren } from 'react'
import { InfoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'

type Props = {
  annotation: string
}

export default function AnnotationText({
  annotation,
  children
}: PropsWithChildren<Props>) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <p>{children}</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <InfoIcon className="h-4 w-4" />
              <span className="sr-only">More information</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{annotation}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
