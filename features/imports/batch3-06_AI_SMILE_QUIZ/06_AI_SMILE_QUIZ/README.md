# AI Smile Quiz Module

Interactive AI-powered smile assessment quiz with dynamic scoring, personalised recommendations, and schema markup for St Mary's House Dental Care.

## Features Included

- **Dynamic Quiz Engine**: Adaptive questions based on user responses
- **AI-Powered Scoring**: Intelligent assessment of smile concerns and goals
- **Personalised Recommendations**: Treatment suggestions based on quiz results
- **Progress Tracking**: Visual progress indicators and completion rewards
- **Schema Markup**: SEO-optimized structured data for rich snippets
- **Lead Generation**: Integrated appointment booking from quiz results
- **Analytics Integration**: Detailed tracking of quiz completion and outcomes

## Brand Integration

- Consistent with St Mary's luxury coastal aesthetic
- Professional dental imagery and terminology
- Brand colors and typography throughout the experience

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
│   ├── quiz/
│   │   ├── SmileQuiz.tsx              # Main quiz component
│   │   ├── QuizQuestion.tsx           # Individual question component
│   │   ├── QuizProgress.tsx           # Progress indicator
│   │   ├── QuizResults.tsx            # Results and recommendations
│   │   └── QuizCTA.tsx                # Call-to-action component
│   ├── scoring/
│   │   ├── ScoreCalculator.tsx        # AI scoring engine
│   │   ├── RecommendationEngine.tsx   # Treatment recommendations
│   │   └── ResultsAnalyzer.tsx        # Results analysis
│   └── ui/
│       ├── QuizCard.tsx               # Question card UI
│       ├── ProgressBar.tsx            # Progress visualization
│       └── ResultsCard.tsx            # Results display
├── lib/
│   ├── quiz/
│   │   ├── question-engine.ts         # Dynamic question logic
│   │   ├── scoring-algorithm.ts       # AI scoring system
│   │   ├── recommendation-rules.ts    # Treatment recommendation rules
│   │   └── quiz-analytics.ts          # Analytics tracking
│   ├── schema/
│   │   ├── quiz-schema.ts             # Schema.org markup
│   │   └── faq-schema.ts              # FAQ structured data
│   └── data/
│       ├── quiz-questions.ts          # Question database
│       └── treatment-data.ts          # Treatment information
├── api/
│   ├── quiz/
│   │   ├── submit/route.ts            # Quiz submission endpoint
│   │   ├── recommendations/route.ts   # Get recommendations
│   │   └── analytics/route.ts         # Quiz analytics
│   └── schema/
│       └── quiz-markup/route.ts       # Schema markup generation
└── demo/
    └── page.tsx                       # Complete demo
```

## Usage Examples

```tsx
import { SmileQuiz } from '@/components/quiz/SmileQuiz'
import { QuizSchema } from '@/lib/schema/quiz-schema'

export default function SmileQuizPage() {
  return (
    <>
      <QuizSchema />
      <SmileQuiz
        onComplete={(results) => {
          console.log('Quiz completed:', results)
          // Handle quiz completion
        }}
        enableAnalytics={true}
        showProgressBar={true}
        allowRetake={true}
      />
    </>
  )
}
```

## Quiz Categories

### Smile Concerns Assessment
- **Tooth Color**: Whitening needs and preferences
- **Tooth Shape**: Cosmetic improvement opportunities
- **Tooth Alignment**: Orthodontic considerations
- **Gum Health**: Periodontal assessment indicators
- **Missing Teeth**: Replacement options evaluation
- **Bite Issues**: Functional problem identification

### Lifestyle Factors
- **Dietary Habits**: Impact on dental health
- **Oral Hygiene**: Current care routine assessment
- **Lifestyle Choices**: Smoking, sports, etc.
- **Aesthetic Goals**: Desired smile outcomes
- **Budget Considerations**: Treatment investment comfort
- **Timeline Preferences**: Treatment urgency and scheduling

## AI Scoring System

### Scoring Categories
- **Aesthetic Score** (0-100): Visual smile appeal
- **Health Score** (0-100): Oral health indicators
- **Functional Score** (0-100): Bite and function assessment
- **Confidence Score** (0-100): Patient confidence level
- **Overall Score** (0-100): Weighted composite score

### Recommendation Engine
- Treatment priority ranking based on scores
- Cost-benefit analysis for treatment options
- Timeline recommendations for optimal results
- Maintenance and prevention suggestions
- Follow-up care planning

## Schema Markup

### Quiz Structured Data
- Quiz entity with questions and answers
- Estimated completion time
- Skill level and difficulty
- Educational value indicators

### FAQ Integration
- Common questions from quiz responses
- Expert answers from dental professionals
- Related treatment information
- Local business schema integration

## Analytics & Insights

### Quiz Metrics
- Completion rates by question
- Drop-off points identification
- Popular answer combinations
- Conversion to appointments
- User engagement patterns

### Business Intelligence
- Treatment demand indicators
- Patient concern trends
- Marketing message effectiveness
- Lead quality assessment
- ROI measurement

## Environment Variables

See `env.example` for AI scoring, analytics, and integration settings.

