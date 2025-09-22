import { Diamond, UserCheck, MapPin } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import Reveal from '../ui/Reveal';

export function FeaturesSection() {
  const features = [
    {
      title: 'Luxurious Amenities',
      description: 'Enjoy private suites, spa-level comfort, and attention to detail.',
      icon: Diamond,
    },
    {
      title: 'Expert Practitioners',
      description: 'Our team of highly skilled practitioners provide personalized treatments.',
      icon: UserCheck,
    },
    {
      title: 'Premier Location',
      description: 'Located in the heart of Brighton seafront, offering stunning views.',
      icon: MapPin,
    },
  ];
  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why Choose <span className="text-primary">St Mary’s House</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience the difference of luxury coastal dentistry with our commitment to excellence, comfort, and personalized care.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={0.2 + idx * 0.1}>
                <GlowCard className="h-full text-left flex flex-col p-6">
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-300 flex-grow">{feature.description}</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
