import AboutPageJsonLd from './AboutPageJsonLd'
import HeroSection from './HeroSection'
import OperatorSection from './OperatorSection'
import SocialProofSection from './SocialProofSection'

export default function AboutTemplate() {
  return (
    <>
      <AboutPageJsonLd />
      <HeroSection />
      <OperatorSection />
      <SocialProofSection />
    </>
  )
}
