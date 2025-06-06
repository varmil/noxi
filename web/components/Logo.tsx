import react from 'react'
import { LucideProps } from 'lucide-react'
import VChartsIcon from 'components/vcharts/svg/icon'

export default function Logo({
  className
}: react.PropsWithoutRef<
  Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
>) {
  return (
    <>
      <VChartsIcon className={`${className || ''}`} />
    </>
  )
}
