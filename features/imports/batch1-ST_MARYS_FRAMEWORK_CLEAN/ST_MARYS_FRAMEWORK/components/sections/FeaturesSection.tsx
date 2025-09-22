import React from 'react'
import { Shield, Award, Clock, Heart, Zap, Users } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Advanced Technology',
    description: 'State-of-the-art 3D imaging and digital dentistry for precise, comfortable treatments.'
  },
  {
    icon: Award,
    title: 'Expert Care',
    description: 'Highly qualified dental professionals with years of experience in luxury dentistry.'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Convenient appointment times including evenings and weekends to fit your schedule.'
  },
  {
    icon: Heart,
    title: 'Gentle Approach',
    description: 'Anxiety-free dentistry with sedation options and a calming coastal environment.'
  },
  {
    icon: Zap,
    title: 'Fast Results',
    description: 'Efficient treatments with minimal downtime using the latest dental techniques.'
  },
  {
    icon: Users,
    title: 'Family Care',
    description: 'Comprehensive dental care for all ages in a welcoming, family-friendly practice.'
  }
]

export function FeaturesSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Why Choose{' '}
            <span className="text-gradient">St Mary's House</span>
          </h2>
          <p className="body-md text-foreground-secondary max-w-2xl mx-auto">
            Experience the difference of luxury coastal dentistry with our commitment 
            to excellence, comfort, and personalized care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-sm mb-2">{feature.title}</h3>
                <p className="body-sm text-foreground-secondary">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

