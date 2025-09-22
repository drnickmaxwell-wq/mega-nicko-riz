# Content Automation Module

AI-powered blog and newsletter generation system with human review workflow and publishing pipeline for St Mary's House Dental Care.

## Features Included

- **AI Blog Generator**: Automated dental blog post creation with SEO optimization
- **Newsletter Automation**: Personalized email newsletter generation
- **Human Review Workflow**: Editorial approval process before publishing
- **Content Calendar**: Automated scheduling and planning
- **SEO Optimization**: Keyword research and content optimization
- **Multi-format Output**: Blog posts, newsletters, social media content
- **Brand Voice Consistency**: Maintains St Mary's professional tone
- **Analytics Integration**: Content performance tracking

## Brand Integration

- Consistent with St Mary's luxury coastal dental brand
- Professional medical tone with approachable personality
- Coastal and luxury themes woven into content naturally
- Brand colors and styling in all generated content

## Installation

1. Extract zip to your project root
2. Copy `src/` contents to your project
3. Configure environment variables from `env.example`
4. Install dependencies from `deps.txt`
5. Set up OpenAI API key for content generation

## File Structure

```
src/
├── components/
│   ├── content/
│   │   ├── ContentGenerator.tsx       # Main content generation interface
│   │   ├── BlogEditor.tsx             # Blog post editor with preview
│   │   ├── NewsletterEditor.tsx       # Newsletter editor
│   │   ├── ContentCalendar.tsx        # Content planning calendar
│   │   └── PublishingQueue.tsx        # Publishing workflow
│   ├── editor/
│   │   ├── RichTextEditor.tsx         # Rich text editing component
│   │   ├── SEOOptimizer.tsx           # SEO optimization tools
│   │   ├── ImageSelector.tsx          # Image selection and optimization
│   │   └── PreviewPane.tsx            # Content preview
│   └── workflow/
│       ├── ReviewWorkflow.tsx         # Human review process
│       ├── ApprovalQueue.tsx          # Content approval queue
│       └── PublishingControls.tsx     # Publishing controls
├── lib/
│   ├── ai/
│   │   ├── content-generator.ts       # AI content generation
│   │   ├── blog-templates.ts          # Blog post templates
│   │   ├── newsletter-templates.ts    # Newsletter templates
│   │   └── seo-optimizer.ts           # SEO optimization logic
│   ├── content/
│   │   ├── content-manager.ts         # Content management system
│   │   ├── publishing-pipeline.ts     # Publishing workflow
│   │   ├── content-calendar.ts        # Calendar management
│   │   └── analytics-tracker.ts       # Content analytics
│   └── templates/
│       ├── dental-topics.ts           # Dental content topics
│       ├── brand-voice.ts             # Brand voice guidelines
│       └── content-formats.ts         # Content format definitions
├── api/
│   ├── content/
│   │   ├── generate/route.ts          # Content generation endpoint
│   │   ├── review/route.ts            # Review workflow API
│   │   ├── publish/route.ts           # Publishing API
│   │   └── calendar/route.ts          # Calendar management
│   └── seo/
│       ├── keywords/route.ts          # Keyword research
│       └── optimize/route.ts          # SEO optimization
└── demo/
    └── page.tsx                       # Complete demo
```

## Usage Examples

```tsx
import { ContentGenerator } from '@/components/content/ContentGenerator'
import { BlogEditor } from '@/components/content/BlogEditor'
import { ReviewWorkflow } from '@/components/workflow/ReviewWorkflow'

export default function ContentManagementPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ContentGenerator
          contentType="blog"
          topics={['dental implants', 'teeth whitening', 'oral health']}
          onGenerate={(content) => {
            console.log('Generated content:', content)
          }}
        />
        <BlogEditor
          content={generatedContent}
          onSave={(content) => {
            // Save to review queue
          }}
        />
      </div>
      <div>
        <ReviewWorkflow
          pendingContent={pendingReviews}
          onApprove={(contentId) => {
            // Approve for publishing
          }}
          onReject={(contentId, feedback) => {
            // Send back for revision
          }}
        />
      </div>
    </div>
  )
}
```

## Content Types

### Blog Posts
- **Educational Articles**: Treatment explanations, oral health tips
- **Patient Stories**: Success stories and testimonials
- **Technology Updates**: New equipment and techniques
- **Seasonal Content**: Holiday oral health, summer smile tips
- **FAQ Articles**: Common patient questions
- **Local Content**: Shoreham-by-Sea community focus

### Newsletters
- **Monthly Practice Updates**: News and announcements
- **Treatment Spotlights**: Featured procedures
- **Patient Education**: Oral health tips and advice
- **Special Offers**: Promotions and discounts
- **Event Announcements**: Community events and workshops
- **Seasonal Health Tips**: Relevant oral health advice

### Social Media Content
- **Instagram Posts**: Visual content with captions
- **Facebook Updates**: Community engagement posts
- **LinkedIn Articles**: Professional dental insights
- **Twitter Updates**: Quick tips and news

## AI Content Generation

### Content Prompts
- Dental expertise and medical accuracy
- St Mary's brand voice and personality
- SEO keyword integration
- Local Shoreham-by-Sea references
- Luxury coastal dental positioning

### Quality Assurance
- Medical fact-checking protocols
- Brand voice consistency checks
- SEO optimization validation
- Readability and engagement scoring
- Duplicate content detection

## Human Review Workflow

### Review Stages
1. **AI Generation**: Initial content creation
2. **Technical Review**: Medical accuracy check
3. **Brand Review**: Voice and messaging alignment
4. **SEO Review**: Search optimization validation
5. **Final Approval**: Publishing authorization
6. **Publishing**: Automated or manual publication

### Review Criteria
- Medical accuracy and safety
- Brand voice consistency
- SEO optimization quality
- Engagement potential
- Legal compliance
- Patient sensitivity

## Publishing Pipeline

### Automated Publishing
- WordPress integration
- Email marketing platform sync
- Social media scheduling
- SEO metadata injection
- Analytics tracking setup

### Content Distribution
- Website blog publication
- Email newsletter delivery
- Social media posting
- Patient portal updates
- Third-party syndication

## Environment Variables

See `env.example` for OpenAI, publishing platforms, and workflow settings.

