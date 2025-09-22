# AI Personalisation Module

Intelligent content personalisation system using clickstream analysis and user profiling for St Mary's House Dental Care.

## Features Included

- **Clickstream Analytics**: Track user behavior and interaction patterns
- **Profile-Based Tailoring**: Dynamic content adaptation based on user segments
- **Segment Rules Engine**: Configurable rules for content personalisation
- **Safe Fallbacks**: Graceful degradation when personalisation unavailable
- **Privacy-First**: GDPR-compliant data collection and processing
- **Real-Time Adaptation**: Dynamic content updates based on current session
- **A/B Testing Framework**: Test different personalisation strategies

## Brand Integration

- Maintains St Mary's luxury aesthetic across all personalised content
- Consistent brand messaging while adapting to user preferences
- Coastal/luxury theming in personalised recommendations

## Installation

1. Extract zip to your project root
2. Copy `src/` contents to your project
3. Configure environment variables from `env.example`
4. Install dependencies from `deps.txt`
5. Set up analytics tracking (optional - mocks provided)

## File Structure

```
src/
├── components/
│   ├── personalisation/
│   │   ├── PersonalisedContent.tsx    # Main personalisation wrapper
│   │   ├── TreatmentRecommendations.tsx # Treatment suggestions
│   │   ├── ContentAdaptor.tsx         # Dynamic content adaptation
│   │   └── UserSegmentDisplay.tsx     # Segment-based content
│   ├── analytics/
│   │   ├── ClickstreamTracker.tsx     # User behavior tracking
│   │   ├── SessionAnalytics.tsx       # Session-based insights
│   │   └── ConsentManager.tsx         # Analytics consent
│   └── testing/
│       ├── ABTestProvider.tsx         # A/B testing framework
│       └── VariantDisplay.tsx         # Test variant rendering
├── lib/
│   ├── personalisation/
│   │   ├── segment-engine.ts          # User segmentation logic
│   │   ├── content-rules.ts           # Personalisation rules
│   │   ├── recommendation-engine.ts   # Treatment recommendations
│   │   └── profile-builder.ts         # User profile construction
│   ├── analytics/
│   │   ├── clickstream-collector.ts   # Event collection
│   │   ├── behavior-analyzer.ts       # Pattern analysis
│   │   └── session-manager.ts         # Session tracking
│   └── testing/
│       ├── ab-test-manager.ts         # A/B test management
│       └── variant-selector.ts        # Test variant logic
├── api/
│   ├── personalisation/route.ts       # Personalisation API
│   ├── analytics/route.ts             # Analytics endpoint
│   └── segments/route.ts              # Segment management
└── demo/
    └── page.tsx                       # Complete demo
```

## Usage Examples

```tsx
import { PersonalisedContent } from '@/components/personalisation/PersonalisedContent'
import { TreatmentRecommendations } from '@/components/personalisation/TreatmentRecommendations'
import { ClickstreamTracker } from '@/components/analytics/ClickstreamTracker'

export default function HomePage() {
  return (
    <ClickstreamTracker>
      <PersonalisedContent
        contentType="hero"
        fallbackContent={<DefaultHero />}
      >
        <TreatmentRecommendations
          maxRecommendations={3}
          includeEmergency={true}
        />
      </PersonalisedContent>
    </ClickstreamTracker>
  )
}
```

## User Segments

### Automatic Segmentation
- **New Visitors**: First-time website visitors
- **Returning Patients**: Previous appointment history
- **Treatment Seekers**: Browsing specific treatments
- **Emergency Visitors**: Urgent care indicators
- **Price Conscious**: Focused on pricing information
- **Luxury Seekers**: Premium treatment interest

### Behavioral Triggers
- Time spent on treatment pages
- Pricing page visits
- Emergency content access
- Contact form interactions
- Video engagement
- 3D model interactions

## Personalisation Rules

### Content Adaptation
- **Hero Messages**: Tailored based on visitor segment
- **Treatment Highlights**: Relevant procedures emphasized
- **Pricing Display**: Adjusted based on price sensitivity
- **Call-to-Actions**: Optimized for user intent
- **Testimonials**: Matched to similar patient profiles

### Recommendation Engine
- Treatment suggestions based on browsing history
- Appointment booking prompts at optimal times
- Educational content matched to interests
- Follow-up care recommendations

## Privacy & Compliance

- **Consent Management**: Explicit opt-in for personalisation
- **Data Minimization**: Only collect necessary data
- **Anonymization**: Personal data protection
- **Right to Opt-Out**: Easy personalisation disable
- **Data Retention**: Configurable retention periods
- **Transparency**: Clear explanation of personalisation

## Environment Variables

See `env.example` for analytics, segmentation, and privacy settings.

