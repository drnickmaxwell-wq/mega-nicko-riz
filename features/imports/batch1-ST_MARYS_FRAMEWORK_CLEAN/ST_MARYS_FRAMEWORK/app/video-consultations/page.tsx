import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Video, Shield, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Secure Video Consultations',
  description: 'Book a secure video consultation with our dental experts. GDPR compliant, convenient, and professional remote dental care.',
  path: '/video-consultations',
})

const features = [
  {
    icon: Shield,
    title: 'GDPR Compliant',
    description: 'Your data is protected with enterprise-grade security and full GDPR compliance.'
  },
  {
    icon: Video,
    title: 'HD Video Quality',
    description: 'Crystal clear video consultations with professional audio for the best experience.'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book consultations at times that work for you, including evenings and weekends.'
  },
  {
    icon: Users,
    title: 'Expert Dentists',
    description: 'Consult with our qualified dental professionals from the comfort of your home.'
  }
]

const consultationTypes = [
  {
    title: 'Initial Consultation',
    duration: '30 minutes',
    price: '£75',
    description: 'Discuss your dental concerns and get professional advice on treatment options.',
    features: ['Dental history review', 'Symptom assessment', 'Treatment recommendations', 'Follow-up plan']
  },
  {
    title: 'Follow-up Consultation',
    duration: '15 minutes',
    price: '£45',
    description: 'Review treatment progress and address any concerns or questions.',
    features: ['Progress review', 'Medication adjustments', 'Care instructions', 'Next steps planning']
  },
  {
    title: 'Emergency Consultation',
    duration: '20 minutes',
    price: '£95',
    description: 'Urgent dental advice for pain management and emergency care guidance.',
    features: ['Pain assessment', 'Emergency advice', 'Prescription guidance', 'Urgent referrals']
  }
]

const howItWorks = [
  {
    step: 1,
    title: 'Book Your Consultation',
    description: 'Choose your preferred time slot and consultation type through our secure booking system.'
  },
  {
    step: 2,
    title: 'Receive Confirmation',
    description: 'Get instant confirmation with joining instructions and pre-consultation questionnaire.'
  },
  {
    step: 3,
    title: 'Join Your Consultation',
    description: 'Access the secure video portal at your appointment time using the provided link.'
  },
  {
    step: 4,
    title: 'Follow-up Care',
    description: 'Receive a consultation summary and any necessary prescriptions or referrals.'
  }
]

export default function VideoConsultationsPage() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 shadow-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">GDPR Compliant & Secure</span>
            </div>
            
            <h1 className="heading-xl mb-6">
              Secure Video{' '}
              <span className="text-gradient">Consultations</span>
            </h1>
            
            <p className="body-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Connect with our dental experts from the comfort of your home. Professional, 
              secure, and convenient consultations with full GDPR compliance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/video-consultations/portal"
                className="btn-primary group"
              >
                Start Secure Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#how-it-works"
                className="btn-outline"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Why Choose Video Consultations?</h2>
            <p className="body-md text-foreground-secondary max-w-2xl mx-auto">
              Experience professional dental care with the convenience of remote consultations, 
              backed by enterprise-grade security and GDPR compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
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
      
      {/* Consultation Types */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Consultation Options</h2>
            <p className="body-md text-foreground-secondary max-w-2xl mx-auto">
              Choose the consultation type that best fits your needs. All consultations include 
              professional advice and follow-up care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((consultation) => (
              <div key={consultation.title} className="card-luxury p-8">
                <div className="text-center mb-6">
                  <h3 className="heading-sm mb-2">{consultation.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{consultation.price}</div>
                  <div className="text-sm text-foreground-secondary">{consultation.duration}</div>
                </div>
                
                <p className="body-sm text-foreground-secondary mb-6 text-center">
                  {consultation.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {consultation.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="body-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/video-consultations/portal"
                  className="btn-primary w-full text-center block"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">How It Works</h2>
            <p className="body-md text-foreground-secondary max-w-2xl mx-auto">
              Getting started with video consultations is simple and secure. 
              Follow these easy steps to connect with our dental experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="heading-sm mb-2">{step.title}</h3>
                <p className="body-sm text-foreground-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Security & Privacy */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="heading-lg mb-4">Your Privacy & Security</h2>
            <p className="body-md text-foreground-secondary mb-8">
              We take your privacy seriously. All video consultations are conducted through our 
              GDPR-compliant platform with end-to-end encryption and secure data handling.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-foreground-secondary">
                  All communications are encrypted and secure
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-sm text-foreground-secondary">
                  Full compliance with data protection regulations
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold mb-2">No Data Retention</h3>
                <p className="text-sm text-foreground-secondary">
                  Consultations are not recorded or stored
                </p>
              </div>
            </div>
            
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Read our full Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

