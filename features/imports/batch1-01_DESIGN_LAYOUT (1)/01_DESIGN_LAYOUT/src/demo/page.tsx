'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/buttons'
import { CookieBanner } from '@/components/gdpr/cookie-banner'

export default function DesignSystemDemo() {
  const [showCookieBanner, setShowCookieBanner] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full" />
              <h1 className="text-xl font-bold text-primary">St Mary's House</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Treatments</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </nav>
            
            <Button variant="primary" size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-full bg-clip-text text-transparent">
              Design System Demo
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Showcasing the complete design system for St Mary's House Dental Care 
            with brand colors, typography, and interactive components.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg" effect="sparkle">
              Sparkle Button
            </Button>
            <Button variant="secondary" size="lg" effect="magnetic">
              Magnetic Button
            </Button>
            <Button variant="outline" size="lg" effect="liquid">
              Liquid Button
            </Button>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary rounded-2xl mx-auto mb-4 shadow-lg" />
              <h3 className="font-semibold text-lg">Primary</h3>
              <p className="text-muted-foreground">Magenta #C2185B</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-secondary rounded-2xl mx-auto mb-4 shadow-lg" />
              <h3 className="font-semibold text-lg">Secondary</h3>
              <p className="text-muted-foreground">Turquoise #40C4B4</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-accent rounded-2xl mx-auto mb-4 shadow-lg" />
              <h3 className="font-semibold text-lg">Accent</h3>
              <p className="text-muted-foreground">Gold #D4AF37</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Headings (Montserrat)</h3>
              <div className="space-y-2">
                <h1 className="text-4xl">Heading 1</h1>
                <h2 className="text-3xl">Heading 2</h2>
                <h3 className="text-2xl">Heading 3</h3>
                <h4 className="text-xl">Heading 4</h4>
                <h5 className="text-lg">Heading 5</h5>
                <h6 className="text-base">Heading 6</h6>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Body Text (Lora)</h3>
              <div className="space-y-4">
                <p className="text-lg">Large body text for important content and introductions.</p>
                <p className="text-base">Regular body text for general content and descriptions.</p>
                <p className="text-sm">Small text for captions, labels, and secondary information.</p>
                <p className="text-xs">Extra small text for fine print and legal text.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Button Components</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Standard Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Special Effects</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" effect="sparkle">Sparkle Effect</Button>
                <Button variant="secondary" effect="magnetic">Magnetic Effect</Button>
                <Button variant="outline" effect="liquid">Liquid Effect</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Normal</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Card Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-border rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Default Card</h3>
              <p className="text-muted-foreground">Standard card with border and subtle shadow.</p>
            </div>
            
            <div className="p-6 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Glass Card</h3>
              <p className="text-muted-foreground">Glass morphism effect with backdrop blur.</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
              <p className="text-muted-foreground">Enhanced shadow for prominence.</p>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Brand Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Primary Gradient</span>
            </div>
            <div className="h-32 gradient-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Accent Gradient</span>
            </div>
            <div className="h-32 gradient-full rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Full Gradient</span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded-full" />
            <span className="font-semibold text-lg">St Mary's House Dental Care</span>
          </div>
          <p className="text-muted-foreground">
            Luxury coastal dentistry in Shoreham-by-Sea, West Sussex
          </p>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <CookieBanner
          onAccept={() => setShowCookieBanner(false)}
          onDecline={() => setShowCookieBanner(false)}
          onCustomize={() => setShowCookieBanner(false)}
        />
      )}
    </div>
  )
}

