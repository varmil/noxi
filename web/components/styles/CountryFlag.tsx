import React from 'react'
import Image from 'components/styles/Image'

type CountryFlagProps = {
  countryCode?: string
  size?: number
  className?: string
}

const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  size = 24,
  className
}) => {
  if (!countryCode) return null

  return (
    <Image
      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
      alt={`${countryCode} flag`}
      width={size}
      height={size}
      className={`object-contain rounded-[2px] border ${className || ''}`}
    />
  )
}

export default CountryFlag
