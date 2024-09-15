import { PropsWithChildren, SVGProps } from 'react'
import { LucideProps } from 'lucide-react'

export function TheaterBottomBar({
  children
}: PropsWithChildren<{ className?: string }>) {
  const sizeClass = 'h-8 sm:h-[10vh] sm:max-h-14'
  const textClass = 'text-xs lg:text-base'
  return (
    <section
      className={`${sizeClass} ${textClass} bg-secondary flex items-center px-4 space-x-6`}
    >
      {children}
    </section>
  )
}

export function TheaterBottomBarIcon({
  Icon
}: {
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
    | React.ComponentType<SVGProps<SVGSVGElement>>
}) {
  return (
    <Icon className="h-3 w-3 sm:h-[5vh] sm:w-[5vh] sm:max-h-5 sm:max-w-5" />
  )
}
