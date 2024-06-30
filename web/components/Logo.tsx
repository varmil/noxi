import { LucideProps, MountainIcon } from 'lucide-react'
import react from 'react'

export default function Logo(
  props: react.PropsWithoutRef<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >
) {
  return (
    <>
      <MountainIcon
        className={`${props.className ?? 'w-6 h-6'}`}
        fill="red"
        stroke="currentColor"
      />
    </>
  )
}
