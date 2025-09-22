// Design System Types

export interface BrandColors {
  primary: string    // Magenta #C2185B
  secondary: string  // Turquoise #40C4B4
  accent: string     // Gold #D4AF37
  background: string
  foreground: string
  muted: string
  border: string
}

export interface Typography {
  fontFamily: {
    heading: string  // Montserrat
    body: string     // Lora
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
    '6xl': string
  }
  fontWeight: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
}

export interface Spacing {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24: string
  32: string
  40: string
  48: string
  56: string
  64: string
}

// Component Props Types

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  effect?: 'none' | 'sparkle' | 'magnetic' | 'liquid'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface CardProps {
  variant?: 'default' | 'glass' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export interface TabsProps {
  tabs: Array<{
    id: string
    label: string
    content: React.ReactNode
  }>
  defaultTab?: string
  onChange?: (tabId: string) => void
}

export interface HeaderProps {
  sticky?: boolean
  transparent?: boolean
  className?: string
}

export interface FooterProps {
  minimal?: boolean
  className?: string
}

export interface CookieConsentProps {
  onAccept: () => void
  onDecline: () => void
  onCustomize: () => void
  position?: 'bottom' | 'top'
  theme?: 'light' | 'dark'
}

