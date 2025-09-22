/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // St Mary's Brand Colors
        primary: {
          DEFAULT: "#C2185B", // Magenta
          50: "#FCE4EC",
          100: "#F8BBD9",
          200: "#F48FB1",
          300: "#F06292",
          400: "#EC407A",
          500: "#C2185B",
          600: "#AD1457",
          700: "#880E4F",
          800: "#6A0B3D",
          900: "#4A0728",
        },
        secondary: {
          DEFAULT: "#40C4B4", // Turquoise
          50: "#E0F7FA",
          100: "#B2EBF2",
          200: "#80DEEA",
          300: "#4DD0E1",
          400: "#26C6DA",
          500: "#40C4B4",
          600: "#00ACC1",
          700: "#0097A7",
          800: "#00838F",
          900: "#006064",
        },
        accent: {
          DEFAULT: "#D4AF37", // Gold
          50: "#FDF6E3",
          100: "#FAE8B8",
          200: "#F7D98A",
          300: "#F4CA5C",
          400: "#F1BB2E",
          500: "#D4AF37",
          600: "#B8941F",
          700: "#9C7A07",
          800: "#7A5F00",
          900: "#5C4700",
        },
        background: {
          DEFAULT: "#F7F7F9", // Light background
          secondary: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#1A1C1F", // Dark text
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lora: ['Lora', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "wave": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "wave": "wave 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'coastal-gradient': 'linear-gradient(135deg, #C2185B 0%, #40C4B4 50%, #D4AF37 100%)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1A1C1F',
            fontFamily: 'Lora, serif',
            h1: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
            },
            h4: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
}

