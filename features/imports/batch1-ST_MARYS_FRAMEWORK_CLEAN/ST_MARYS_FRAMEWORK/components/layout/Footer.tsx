import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  practice: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Patient Stories', href: '/patient-stories' },
    { name: 'Blog', href: '/blog' },
  ],
  treatments: [
    { name: 'Cosmetic Dentistry', href: '/treatments/cosmetic' },
    { name: 'Dental Implants', href: '/treatments/implants' },
    { name: 'Teeth Whitening', href: '/treatments/whitening' },
    { name: 'Emergency Care', href: '/treatments/emergency' },
  ],
  patients: [
    { name: 'Patient Leaflets', href: '/patient-leaflets' },
    { name: 'Video Consultations', href: '/video-consultations' },
    { name: 'Fees & Payment', href: '/fees' },
    { name: 'FAQs', href: '/faqs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/stmaryshousedental', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/stmaryshousedental', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/st-marys-house-dental-care', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/stmaryshousedental', icon: Twitter },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Practice Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-montserrat">SM</span>
                </div>
                <div>
                  <div className="text-xl font-bold font-montserrat text-foreground">
                    St Mary's House
                  </div>
                  <div className="text-sm text-foreground-secondary font-lora">
                    Dental Care
                  </div>
                </div>
              </Link>
              
              <p className="text-foreground-secondary font-lora mb-6 max-w-md">
                Luxury coastal dentistry practice in Shoreham-by-Sea, offering advanced dental 
                treatments with exceptional patient care in a relaxing, modern environment.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground-secondary">
                    123 High Street, Shoreham-by-Sea, West Sussex BN43 5DA
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a 
                    href="tel:+441273453109" 
                    className="text-foreground-secondary hover:text-primary transition-colors"
                  >
                    01273 453 109
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a 
                    href="mailto:info@stmaryshousedental.co.uk" 
                    className="text-foreground-secondary hover:text-primary transition-colors"
                  >
                    info@stmaryshousedental.co.uk
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground-secondary">
                    Mon-Fri: 8:00-18:00, Sat: 9:00-17:00
                  </span>
                </div>
              </div>
            </div>
            
            {/* Practice Links */}
            <div>
              <h3 className="font-semibold font-montserrat text-foreground mb-4">Practice</h3>
              <ul className="space-y-3">
                {footerLinks.practice.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Treatment Links */}
            <div>
              <h3 className="font-semibold font-montserrat text-foreground mb-4">Treatments</h3>
              <ul className="space-y-3">
                {footerLinks.treatments.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Patient Links */}
            <div>
              <h3 className="font-semibold font-montserrat text-foreground mb-4">Patients</h3>
              <ul className="space-y-3">
                {footerLinks.patients.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-200/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-sm text-foreground-secondary">
              © {currentYear} St Mary's House Dental Care. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-foreground-secondary hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-4">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs text-foreground-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-xs text-foreground-secondary">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Professional Registrations */}
        <div className="border-t border-gray-200/50 py-4">
          <div className="text-center">
            <p className="text-xs text-foreground-secondary">
              Registered with the General Dental Council (GDC) • CQC Registered • 
              Member of the British Dental Association (BDA)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

