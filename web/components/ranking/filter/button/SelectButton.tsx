import { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'

export default function SelectButton({
  children,
  className,
  ...rest
}: ComponentProps<typeof Button>) {
  return (
    <Button
      className={`w-full text-xs sm:text-sm h-8 sm:h-10 font-normal justify-start ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </Button>
  )
}
