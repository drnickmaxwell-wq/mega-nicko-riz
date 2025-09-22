import React from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Calendar } from 'lucide-react'

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-4">
            Ready to Transform{' '}
            <span className="text-gradient">Your Smile?</span>
          </h2>
          
          <p className="body-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
            Take the first step towards your perfect smile. Book a consultation with our 
            expert dental team and discover the difference luxury coastal dentistry can make.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Link
              href="/contact"
              className="btn-primary group text-lg px-8 py-4"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="tel:+441273453109"
              className="btn-outline text-lg px-8 py-4 group"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-foreground-secondary">01273 453 109</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-foreground-secondary">
                123 High Street<br />
                Shoreham-by-Sea, BN43 5DA
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold mb-2">Opening Hours</h3>
              <p className="text-sm text-foreground-secondary">
                Mon-Fri: 8:00-18:00<br />
                Sat: 9:00-17:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

