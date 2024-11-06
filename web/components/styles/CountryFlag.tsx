import React from 'react'
import Image from 'components/styles/Image'

type CountryFlagProps = {
  countryCode?: string
  size?: number
}

const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  size = 24
}) => {
  if (!countryCode) return null

  return (
    <Image
      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
      alt={`${countryCode} flag`}
      width={size}
      height={size}
      className="object-contain rounded-[2px] border"
    />
  )
}

export default CountryFlag
