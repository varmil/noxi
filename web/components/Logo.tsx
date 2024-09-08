import react from 'react'
import { LucideProps } from 'lucide-react'
import PeakxIcon from 'components/peakx/svg/icon'

export default function Logo({
  className
}: react.PropsWithoutRef<
  Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>) {
  return (
    <>
      <PeakxIcon className={`${className || ''}`} />
    </>
  )
}
