// components/sections/TreatmentsSection.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Smile, Zap } from 'lucide-react';

import GlowCard from '../ui/GlowCard';
import Reveal from '../ui/Reveal';

const treatments = [
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with veneers, crowns, and aesthetic treatments.',
    href: '/treatments/cosmetic',
    color: 'from-primary to-secondary',
  },
  {
    icon: Smile,
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions for a natural-looking smile.',
    href: '/treatments/implants',
    color: 'from-secondary to-accent',
  },
  {
    icon: Zap,
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more confident smile.',
    href: '/treatments/whitening',
    color: 'from-accent to-primary',
  },
];

export function TreatmentsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <Reveal>
          <h2 className="heading-lg mb-4 text-center">
            Our <span className="text-gradient">Treatments</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-md text-foreground-secondary max-w-2xl mx-auto text-center mb-12">
            Discover our comprehensive range of dental treatments, from routine care to advanced cosmetic
            procedures, all delivered with luxury and precision.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {treatments.map((t) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title}>
                <GlowCard className="relative p-8 group overflow-hidden">
                  <Link
                    href={t.href}
                    className="absolute inset-0 z-10"
                    aria-label={`${t.title} link`}
                  />
                  {/* gold hover tint */}
                  <span className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className={`w-16 h-16 bg-gradient-to-r ${t.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="heading-sm mb-3 group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="body-sm text-foreground-secondary mb-6">{t.description}</p>
                  <div className="flex items-center text-sm font-semibold">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/treatments" className="btn-primary">
            View All Treatments
          </Link>
        </div>
      </div>
    </section>
  );
}


