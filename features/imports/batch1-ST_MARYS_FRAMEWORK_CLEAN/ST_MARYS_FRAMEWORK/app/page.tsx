import React from 'react'
import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TreatmentsSection } from '@/components/sections/TreatmentsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Luxury Coastal Dentistry in Shoreham-by-Sea',
  description: 'Experience exceptional dental care at St Mary\'s House Dental Care. Advanced treatments, luxury comfort, and personalized service in beautiful Shoreham-by-Sea.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TreatmentsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

