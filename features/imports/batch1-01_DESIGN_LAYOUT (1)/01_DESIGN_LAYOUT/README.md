# Design & Layout Module

Complete design system with brand tokens, components, and GDPR compliance for St Mary's House Dental Care.

## Features Included

- **Design Tokens**: Brand colors, typography, spacing system
- **Header/Footer**: Responsive navigation with sticky header
- **Component Library**: Buttons (sparkle/magnetic/liquid), cards, tabs, modals
- **Cookie Banner**: GDPR-compliant consent management
- **Layout System**: Responsive grid and container components

## Brand Tokens

- **Colors**: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
- **Fonts**: Montserrat (headings), Lora (body text)
- **Spacing**: Consistent scale based on 4px grid

## Installation

1. Extract zip to your project root
2. Copy `src/` contents to your project
3. Import design tokens in your CSS/Tailwind config
4. Use components as shown in examples

## File Structure

```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── layout/       # Header, footer, containers
│   └── gdpr/         # Cookie banner and consent
├── styles/
│   ├── globals.css   # Design tokens and base styles
│   └── components.css # Component-specific styles
├── types/
│   └── design.ts     # TypeScript definitions
└── demo/
    └── page.tsx      # Demo page showcasing all components
```

## Usage Examples

```tsx
import { SparkleButton, MagneticButton } from '@/components/ui/buttons'
import { Header, Footer } from '@/components/layout'
import { CookieBanner } from '@/components/gdpr'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  )
}
```

## Environment Variables

See `env.example` for all configuration options.

## Demo

Run the included demo page to see all components in action with your brand styling.

