import React from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Brighton',
    rating: 5,
    text: 'Absolutely exceptional care! The team at St Mary\'s House made me feel completely at ease. My smile transformation exceeded all expectations.',
    treatment: 'Porcelain Veneers'
  },
  {
    name: 'Michael Chen',
    location: 'Hove',
    rating: 5,
    text: 'The most professional and caring dental practice I\'ve ever visited. The coastal setting is so relaxing, and the results speak for themselves.',
    treatment: 'Dental Implants'
  },
  {
    name: 'Emma Williams',
    location: 'Worthing',
    rating: 5,
    text: 'From the moment I walked in, I knew I was in excellent hands. The technology is incredible and the staff are genuinely caring.',
    treatment: 'Teeth Whitening'
  }
]

export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            What Our{' '}
            <span className="text-gradient">Patients Say</span>
          </h2>
          <p className="body-md text-foreground-secondary max-w-2xl mx-auto">
            Don't just take our word for it. Read what our patients have to say 
            about their experience at St Mary's House Dental Care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-luxury p-8 relative">
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="body-sm text-foreground-secondary mb-6 italic">
                "{testimonial.text}"
              </p>
              
              {/* Patient Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-foreground-secondary">{testimonial.location}</div>
                <div className="text-xs text-primary mt-1">{testimonial.treatment}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-foreground-secondary">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <span>5.0 Average Rating</span>
            </div>
            <div>500+ Happy Patients</div>
            <div>10+ Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}

