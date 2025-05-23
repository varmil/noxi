import { PropsWithChildren, SVGProps } from 'react'
import { LucideProps } from 'lucide-react'

export const BOTTOM_BAR_HEIGHT = 'clamp(2.5rem, 9vmin, 3.5rem)'

export function TheaterBottomBar({
  className,
  children
}: PropsWithChildren<{ className?: string }>) {
  const sizeClass = 'h-[clamp(2.5rem,9vmin,3.5rem)]'
  const textClass = 'text-xs sm:text-sm text-gray-300'
  return (
    <section
      className={`${sizeClass} ${textClass} bg-black flex items-center px-4 space-x-6 ${
        className ?? ''
      }`}
    >
      {children}
    </section>
  )
}

export function TheaterBottomBarIcon({
  Icon,
  className
}: {
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
    | React.ComponentType<SVGProps<SVGSVGElement>>
  className?: string
}) {
  return (
    <Icon
      className={`h-[clamp(1rem,4.1vmin,1.25rem)] w-[clamp(1rem,4.1vmin,1.25rem)] ${
        className ?? ''
      }`}
    />
  )
}
