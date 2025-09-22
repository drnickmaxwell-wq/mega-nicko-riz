import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Smile, Zap } from 'lucide-react'

const treatments = [
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with veneers, crowns, and aesthetic treatments.',
    href: '/treatments/cosmetic',
    color: 'from-primary to-secondary'
  },
  {
    icon: Smile,
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions for a natural-looking smile.',
    href: '/treatments/implants',
    color: 'from-secondary to-accent'
  },
  {
    icon: Zap,
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more confident smile.',
    href: '/treatments/whitening',
    color: 'from-accent to-primary'
  }
]

export function TreatmentsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Our{' '}
            <span className="text-gradient">Treatments</span>
          </h2>
          <p className="body-md text-foreground-secondary max-w-2xl mx-auto">
            Discover our comprehensive range of dental treatments, from routine care 
            to advanced cosmetic procedures, all delivered with luxury and precision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {treatments.map((treatment) => {
            const Icon = treatment.icon
            return (
              <Link
                key={treatment.title}
                href={treatment.href}
                className="card-luxury p-8 group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${treatment.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="heading-sm mb-3 group-hover:text-primary transition-colors">
                  {treatment.title}
                </h3>
                
                <p className="body-sm text-foreground-secondary mb-6">
                  {treatment.description}
                </p>
                
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            )
          })}
        </div>
        
        <div className="text-center">
          <Link
            href="/treatments"
            className="btn-primary"
          >
            View All Treatments
          </Link>
        </div>
      </div>
    </section>
  )
}

