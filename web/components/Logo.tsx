import react from 'react'
import { LucideProps, MountainIcon } from 'lucide-react'

export default function Logo(
  props: react.PropsWithoutRef<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >
) {
  return (
    <>
      <MountainIcon
        className={`${props.className ?? 'w-6 h-6'}`}
        fill="#FF8C00"
        stroke="#696969"
      />
    </>
  )
}
