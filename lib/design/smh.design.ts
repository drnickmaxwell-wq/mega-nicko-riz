// lib/design/smh.design.ts

/* ------------------------------------------------------------------ */
/*  TOKENS                                                            */
/* ------------------------------------------------------------------ */

export const SMHTokens = {
  tokens: {
    colors: {
      primary: {
        pink: "#C2185B",
        turquoise: "#40C4B4",
        gold: "#D4AF37",
      },
      gradients: {
        pinkToTurquoise: "linear-gradient(135deg, #C2185B 0%, #40C4B4 100%)",
        turquoiseToBlue: "linear-gradient(135deg, #40C4B4 0%, #0288D1 100%)",
        goldToPink: "linear-gradient(135deg, #D4AF37 0%, #C2185B 100%)",
      },
      neutrals: {
        white: "#FFFFFF",
        lightGray: "#F5F7FA",
        mediumGray: "#E1E5EB",
        darkGray: "#4A5568",
        black: "#1A202C",
      },
      backgrounds: {
        light: "#F8FAFC",
        dark: "#0F172A",
        glass: "rgba(255, 255, 255, 0.1)",
      },
      states: {
        success: "#48BB78",
        warning: "#ED8936",
        error: "#E53E3E",
        info: "#4299E1",
      },
      emergency: "#FF3B30",
    },
    typography: {
      fontFamilies: {
        primary: "'Montserrat', sans-serif",
        secondary: "'Playfair Display', serif",
        accent: "'Cormorant Garamond', serif",
      },
      fontSizes: {
        h1: {
          desktop: "3.5rem",
          mobile: "2.5rem",
          weight: 700,
          lineHeight: 1.2,
        },
        h2: {
          desktop: "2.75rem",
          mobile: "2rem",
          weight: 700,
          lineHeight: 1.2,
        },
        h3: {
          desktop: "2.25rem",
          mobile: "1.75rem",
          weight: 600,
          lineHeight: 1.3,
        },
        h4: {
          desktop: "1.75rem",
          mobile: "1.5rem",
          weight: 600,
          lineHeight: 1.3,
        },
        h5: {
          desktop: "1.5rem",
          mobile: "1.25rem",
          weight: 600,
          lineHeight: 1.4,
        },
        h6: {
          desktop: "1.25rem",
          mobile: "1.125rem",
          weight: 600,
          lineHeight: 1.4,
        },
        body: {
          large: "1.125rem",
          default: "1rem",
          small: "0.875rem",
          weight: 400,
          lineHeight: 1.6,
        },
        caption: {
          default: "0.875rem",
          small: "0.75rem",
          weight: 400,
          lineHeight: 1.5,
        },
      },
    },
    spacing: {
      base: "0.25rem",
      xs: "0.5rem",
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "2.5rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem",
      "5xl": "8rem",
    },
    effects: {
      shadows: {
        sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        inner: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
      },
      borders: {
        thin: "1px solid",
        medium: "2px solid",
        thick: "4px solid",
      },
      radii: {
        none: "0",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      glassMorphism: {
        light: "backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.7);",
        dark: "backdrop-filter: blur(10px); background: rgba(15, 23, 42, 0.7);",
      },
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/*  SPECIAL EFFECTS                                                    */
/* ------------------------------------------------------------------ */

export const SMHSpecialEffects = {
  specialEffects: {
    sparkleButton: {
      variants: {
        primary: {
          background: "linear-gradient(135deg, #C2185B 0%, #40C4B4 100%)",
          sparkleColors: ["rgba(255, 255, 255, 0.8)", "rgba(212, 175, 55, 0.8)"],
          hoverState: "transform: translateY(-2px); box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);",
          activeState: "transform: translateY(0); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
        },
        secondary: {
          background: "linear-gradient(135deg, #40C4B4 0%, #0288D1 100%)",
          sparkleColors: ["rgba(255, 255, 255, 0.8)", "rgba(194, 24, 91, 0.8)"],
          hoverState: "transform: translateY(-2px); box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);",
          activeState: "transform: translateY(0); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
        },
        gold: {
          background: "linear-gradient(135deg, #D4AF37 0%, #C2185B 100%)",
          sparkleColors: ["rgba(255, 255, 255, 0.8)", "rgba(64, 196, 180, 0.8)"],
          hoverState: "transform: translateY(-2px); box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);",
          activeState: "transform: translateY(0); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
        },
        emergency: {
          background: "linear-gradient(135deg, #FF3B30 0%, #C2185B 100%)",
          sparkleColors: ["rgba(255, 255, 255, 0.8)", "rgba(255, 204, 0, 0.8)"],
          hoverState: "transform: translateY(-2px); box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);",
          activeState: "transform: translateY(0); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
        },
      },
      animation: {
        duration: "1.5s",
        timing: "ease-in-out",
        sparkleCount: 5,
        sparkleSize: "4px to 8px",
        sparkleOpacity: "0.8 to 0",
        sparkleSpeed: "1.2s",
        reducedMotion: "opacity: 0.9 to 1;",
      },
    },
    shimmerText: {
      variants: {
        primary: {
          baseColor: "#C2185B",
          gradientColors: ["#C2185B", "#FFFFFF", "#40C4B4"],
          direction: "to right",
        },
        secondary: {
          baseColor: "#40C4B4",
          gradientColors: ["#40C4B4", "#FFFFFF", "#0288D1"],
          direction: "to right",
        },
        gold: {
          baseColor: "#D4AF37",
          gradientColors: ["#D4AF37", "#FFFFFF", "#C2185B"],
          direction: "to right",
        },
      },
      animation: {
        duration: "2.5s",
        timing: "ease",
        delay: "0s",
        iterationCount: "infinite",
        reducedMotion: "none",
      },
    },
    waveBackground: {
      layers: [
        { zIndex: 1, opacity: 0.7, colors: ["#C2185B", "#40C4B4"], speed: "20s", amplitude: "20px" },
        { zIndex: 2, opacity: 0.5, colors: ["#40C4B4", "#0288D1"], speed: "15s", amplitude: "15px" },
        { zIndex: 3, opacity: 0.3, colors: ["#D4AF37", "#C2185B"], speed: "25s", amplitude: "25px" },
      ],
      particles: {
        enabled: true,
        count: 50,
        colors: ["rgba(255, 255, 255, 0.5)", "rgba(212, 175, 55, 0.5)"],
        size: "2px to 6px",
        speed: "3s to 8s",
        reducedMotion: "count: 10",
      },
    },
    microAnimations: {
      cardHover: {
        transform: "translateY(-10px)",
        shadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
        duration: "0.3s",
        timing: "ease-out",
        reducedMotion: "box-shadow: 0 0 0 2px #40C4B4;",
      },
      gradientGlow: {
        colors: ["rgba(194, 24, 91, 0.2)", "rgba(64, 196, 180, 0.2)", "rgba(212, 175, 55, 0.2)"],
        duration: "3s",
        timing: "ease-in-out",
        iterationCount: "infinite",
        reducedMotion: "none",
      },
      parallaxSections: {
        scrollSpeed: { background: 0.1, midground: 0.3, foreground: 0.6 },
        reducedMotion: "none",
      },
      tidalBreathing: {
        scale: "1 to 1.05",
        duration: "4s",
        timing: "ease-in-out",
        iterationCount: "infinite",
        direction: "alternate",
        reducedMotion: "none",
      },
      lighthouseSweep: {
        rotation: "0deg to 360deg",
        duration: "8s",
        timing: "linear",
        iterationCount: "infinite",
        reducedMotion: "none",
      },
      morphingPetals: {
        paths: [
          "M50,0 C60,40 100,50 60,100 C40,100 0,60 0,50 C0,40 40,0 50,0 Z",
          "M50,0 C70,30 100,30 70,100 C30,100 0,70 0,30 C0,30 30,0 50,0 Z",
        ],
        duration: "8s",
        timing: "ease-in-out",
        iterationCount: "infinite",
        direction: "alternate",
        reducedMotion: "none",
      },
      seaGlassOverlay: {
        blur: "10px",
        opacity: "0.7",
        colors: ["rgba(255, 255, 255, 0.3)", "rgba(64, 196, 180, 0.2)"],
        reducedMotion: "none",
      },
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/*  LAYOUTS                                                           */
/* ------------------------------------------------------------------ */

export const SMHLayouts = {
  layoutByPage: {
    homepage: {
      sections: [
        {
          name: "hero",
          containerWidth: "100%",
          padding: "0",
          background: {
            type: "video",
            overlay: "linear-gradient(135deg, rgba(194, 24, 91, 0.7) 0%, rgba(64, 196, 180, 0.7) 100%)",
            waves: true,
          },
          content: {
            alignment: "center",
            maxWidth: "1200px",
            padding: "8rem 2rem",
            typography: {
              heading: { font: "secondary", size: "h1", color: "white", effect: "shimmerText.primary" },
              subheading: { font: "primary", size: "h4", color: "white" },
            },
            buttons: [
              { type: "sparkleButton.primary", text: "Book Consultation", icon: "calendar.svg" },
              { type: "sparkleButton.emergency", text: "Emergency Care", icon: "emergency.svg" },
            ],
            video: "hero-video.mp4",
          },
        },
        {
          name: "about",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            maxWidth: "800px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              body: { font: "primary", size: "body.large", color: "neutrals.darkGray" },
            },
            stats: [
              { value: "5,000+", label: "Happy Patients", icon: "smile.svg", color: "primary.pink" },
              { value: "4.9/5", label: "Patient Rating", icon: "star.svg", color: "primary.gold" },
              { value: "20+", label: "Years Experience", icon: "calendar.svg", color: "primary.turquoise" },
            ],
          },
        },
        {
          name: "services",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", opacity: 0.05, waves: true },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 3, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                { title: "Preventive Care", icon: "tooth-shield.svg", color: "primary.turquoise" },
                { title: "Cosmetic Dentistry", icon: "tooth-sparkle.svg", color: "primary.pink" },
                { title: "Restorative Dentistry", icon: "tooth-repair.svg", color: "primary.gold" },
                { title: "Emergency Care", icon: "emergency.svg", color: "emergency" },
                { title: "Orthodontics", icon: "braces.svg", color: "primary.turquoise" },
                { title: "Specialist Treatments", icon: "specialist.svg", color: "primary.pink" },
              ],
            },
          },
        },
        {
          name: "cta",
          containerWidth: "100%",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "800px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "neutrals.white" },
              body: { font: "primary", size: "body.large", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.gold", text: "Book Your Appointment", icon: "calendar.svg" },
              { type: "sparkleButton.secondary", text: "Call Us", icon: "phone.svg" },
            ],
          },
        },
        {
          name: "location",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "left",
            layout: "twoColumn",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              body: { font: "primary", size: "body.default", color: "neutrals.darkGray" },
            },
            map: { height: "400px", borderRadius: "radii.lg", shadow: "shadows.md" },
            contactInfo: {
              address: "St Mary's House, St Mary's Road, Shoreham-by-Sea, BN43 5ZA",
              phone: "01273 453109",
              email: "info@smhdental.co.uk",
              hours: ["Monday - Friday: 8:00 - 18:00", "Saturday: 9:00 - 17:00", "Sunday: Closed"],
            },
          },
        },
      ],
    },

    treatments: {
      sections: [
        {
          name: "hero",
          containerWidth: "100%",
          padding: "0",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "1200px",
            padding: "8rem 2rem",
            typography: {
              heading: { font: "secondary", size: "h1", color: "neutrals.white" },
              subheading: { font: "primary", size: "h4", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.gold", text: "Book Consultation", icon: "calendar.svg" },
              { type: "sparkleButton.secondary", text: "Emergency Care", icon: "emergency.svg" },
            ],
          },
        },
        {
          name: "featured-treatments",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 3, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                {
                  title: "3D Printed Veneers",
                  badge: { text: "Most Popular", color: "primary.pink" },
                  price: "£800+ per veneer",
                  duration: "2 appointments",
                  features: ["Same-day treatment", "Digital precision", "Natural appearance", "Long-lasting results"],
                  button: { text: "Learn More", type: "sparkleButton.primary" },
                },
                {
                  title: "3D Implant Restorations",
                  badge: { text: "Advanced Tech", color: "primary.turquoise" },
                  price: "£2,500+ per implant",
                  duration: "3-5 appointments",
                  features: ["Guided surgery", "Digital planning", "Precise placement", "Natural-looking results"],
                  button: { text: "Learn More", type: "sparkleButton.primary" },
                },
                {
                  title: "Digital Twin Simulation",
                  badge: { text: "AI-Powered", color: "primary.gold" },
                  price: "Complimentary with treatment",
                  duration: "1 appointment",
                  features: ["See results before treatment", "AI smile design", "3D visualization", "Treatment planning"],
                  button: { text: "Learn More", type: "sparkleButton.primary" },
                },
              ],
            },
          },
        },
        {
          name: "all-treatments",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", opacity: 0.05, waves: true },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 4, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                { title: "3D Printed Veneers", badge: { text: "Cosmetic", color: "primary.pink" },  price: "From £800",     image: "veneer.svg",        link: "/treatments/3d-printed-veneers" },
                { title: "3D Implant Restorations", badge: { text: "Restorative", color: "primary.turquoise" }, price: "From £2,500",   image: "implant.svg",       link: "/treatments/3d-implant-restorations" },
                { title: "Digital Twin Simulation", badge: { text: "Technology", color: "primary.gold" }, price: "Complimentary", image: "digital-twin.svg",   link: "/treatments/digital-twin-simulation" },
                { title: "Emergency Dentistry",     badge: { text: "Emergency",  color: "emergency" },         price: "From £150",    image: "emergency.svg",     link: "/emergency-dentist" },
                { title: "Professional Whitening",  badge: { text: "Cosmetic",   color: "primary.pink" },      price: "From £350",    image: "whitening.svg",     link: "/treatments/professional-whitening" },
                { title: "Anxiety-Free Dentistry",  badge: { text: "Comfort",    color: "primary.turquoise" }, price: "Included",     image: "anxiety.svg",        link: "/treatments/anxiety-free-dentistry" },
                { title: "Preventive Care",         badge: { text: "Preventive", color: "primary.gold" },      price: "From £75",     image: "preventive.svg",     link: "/treatments/preventive-care" },
                { title: "Orthodontics",            badge: { text: "Orthodontic",color: "primary.pink" },      price: "From £1,500",  image: "orthodontics.svg",   link: "/treatments/orthodontics" },
              ],
            },
          },
        },
        {
          name: "technology",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            features: {
              layout: "grid",
              columns: { desktop: 3, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                { title: "3D CBCT Imaging", description: "Precise treatment planning with 3D scans", icon: "3d-scanner.svg", color: "primary.pink" },
                { title: "Intraoral Scanners", description: "Comfortable digital impressions", icon: "intraoral.svg", color: "primary.turquoise" },
                { title: "AI Smile Design", description: "Visualize your results before treatment", icon: "ai.svg", color: "primary.gold" },
                { title: "Same-day 3D Printing", description: "Custom restorations in a single visit", icon: "printer.svg", color: "primary.pink" },
                { title: "Laser Dentistry", description: "Minimally invasive procedures", icon: "laser.svg", color: "primary.turquoise" },
                { title: "Digital Workflow", description: "Faster, more accurate results", icon: "digital.svg", color: "primary.gold" },
              ],
            },
            badges: [
              { text: "3D Imaging", color: "primary.pink" },
              { text: "AI Design", color: "primary.turquoise" },
            ],
          },
        },
        {
          name: "pricing",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", opacity: 0.05, waves: true },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 3, tablet: 3, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                { title: "Flexible Payment Plans", description: "0% finance options available", icon: "credit-card.svg", color: "primary.pink" },
                { title: "Insurance Accepted", description: "We work with most providers", icon: "shield.svg", color: "primary.turquoise" },
                { title: "No Hidden Costs", description: "Transparent pricing", icon: "check-circle.svg", color: "primary.gold" },
              ],
            },
          },
        },
        {
          name: "cta",
          containerWidth: "100%",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "800px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "neutrals.white" },
              body: { font: "primary", size: "body.large", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.gold", text: "Book Your Consultation", icon: "calendar.svg" },
              { type: "sparkleButton.secondary", text: "Call Us", icon: "phone.svg" },
            ],
          },
        },
      ],
    },

    team: {
      sections: [
        {
          name: "hero",
          containerWidth: "100%",
          padding: "0",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "1200px",
            padding: "8rem 2rem",
            typography: {
              heading: { font: "secondary", size: "h1", color: "neutrals.white" },
              subheading: { font: "primary", size: "h4", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.gold", text: "Book With Our Team", icon: "calendar.svg" },
              { type: "sparkleButton.secondary", text: "01273 453109", icon: "phone.svg" },
            ],
          },
        },
        {
          name: "stats",
          containerWidth: "1200px",
          padding: "4rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            stats: [
              { value: "6",     label: "Dental Professionals", color: "primary.pink" },
              { value: "80+",   label: "Years Combined Experience", color: "primary.turquoise" },
              { value: "15+",   label: "Qualifications & Certifications", color: "primary.gold" },
              { value: "5,000+",label: "Happy Patients Treated", color: "primary.pink" },
            ],
          },
        },
        {
          name: "team-members",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", opacity: 0.05, waves: true },
          content: {
            alignment: "center",
            members: [
              {
                name: "Dr. Nick Maxwell",
                role: "Principal Dentist & Founder",
                photo: "dr-maxwell.jpg",
                color: "primary.pink",
                experience: "15+ years experience",
                qualifications: "BDS, MFGDP(UK), Dip Imp Dent",
                specialties: ["3D Dentistry","Implants","Cosmetic Dentistry","Digital Smile Design"],
                languages: ["English","Spanish"],
                interests: ["Sailing","Photography","Technology"],
                layout: "left",
                button: { text: "Book Appointment", type: "sparkleButton.primary" },
              },
              {
                name: "Dr. Sarah Chen",
                role: "Senior Associate Dentist",
                photo: "dr-chen.jpg",
                color: "primary.turquoise",
                experience: "12+ years experience",
                qualifications: "BDS, MSc Endodontics, MJDF RCS(Eng)",
                specialties: ["Endodontics","Root Canal Therapy","Microscopic Dentistry","Pain Management"],
                languages: ["English","Mandarin","Cantonese"],
                interests: ["Classical Music","Hiking"],
                layout: "right",
                button: { text: "Book Appointment", type: "sparkleButton.primary" },
              },
              {
                name: "Dr. James Wright",
                role: "Specialist Oral Surgeon",
                photo: "dr-wright.jpg",
                color: "primary.gold",
                experience: "18+ years experience",
                qualifications: "BDS, FDSRCS, MSc Oral Surgery",
                specialties: ["Oral Surgery","Dental Implants","Wisdom Teeth","Facial Trauma"],
                languages: ["English","French"],
                interests: ["Rugby","Cooking","Travel"],
                layout: "left",
                button: { text: "Book Appointment", type: "sparkleButton.primary" },
              },
              {
                name: "Emma Thompson",
                role: "Senior Dental Hygienist",
                photo: "dental-assistant-1.jpg",
                color: "primary.pink",
                experience: "10+ years experience",
                qualifications: "Dip Dent Hygiene, BSc Oral Health",
                specialties: ["Preventive Care","Periodontal Treatment","Oral Health Education","Stain Removal"],
                languages: ["English"],
                interests: ["Yoga","Nutrition","Gardening"],
                layout: "right",
                button: { text: "Book Appointment", type: "sparkleButton.primary" },
              },
              {
                name: "Michael Johnson",
                role: "Dental Therapist",
                photo: "dental-assistant-2.jpg",
                color: "primary.turquoise",
                experience: "8+ years experience",
                qualifications: "BSc Dental Therapy & Hygiene",
                specialties: ["Fillings","Children's Dentistry","Preventive Care","Oral Health Education"],
                languages: ["English"],
                interests: ["Running","Photography","Volunteering"],
                layout: "left",
                button: { text: "Book Appointment", type: "sparkleButton.primary" },
              },
              {
                name: "Lisa Roberts",
                role: "Practice Manager",
                photo: "receptionist.jpg",
                color: "primary.gold",
                experience: "15+ years experience",
                qualifications: "Cert. Practice Management, ILM Level 5",
                specialties: ["Patient Care","Team Leadership","Practice Operations","Treatment Coordination"],
                languages: ["English"],
                interests: ["Reading","Theatre","Cycling"],
                layout: "right",
                button: { text: "Contact", type: "sparkleButton.primary" },
              },
            ],
          },
        },
        {
          name: "values",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 4, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                { title: "Teamwork",              description: "Working together for your care",   icon: "users.svg",  color: "primary.pink" },
                { title: "Continuous Learning",   description: "Always improving our skills",     icon: "star.svg",   color: "primary.turquoise" },
                { title: "Collaborative Care",    description: "Involving you in decisions",      icon: "users.svg",  color: "primary.gold" },
                { title: "Ethical Excellence",    description: "Highest standards of care",       icon: "shield.svg", color: "primary.pink" },
              ],
            },
          },
        },
        {
          name: "join-team",
          containerWidth: "100%",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "800px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "neutrals.white" },
              body: { font: "primary", size: "body.large", color: "neutrals.white" },
            },
            features: {
              layout: "grid",
              columns: { desktop: 3, tablet: 2, mobile: 1 },
              gap: "2rem",
              items: [
                { text: "Competitive Salary",    icon: "check.svg" },
                { text: "Continuous Education",  icon: "check.svg" },
                { text: "Modern Equipment",      icon: "check.svg" },
                { text: "Work-Life Balance",     icon: "check.svg" },
                { text: "Career Progression",    icon: "check.svg" },
                { text: "Supportive Team",       icon: "check.svg" },
              ],
            },
            buttons: [
              { text: "View Current Opportunities", type: "sparkleButton.gold" },
            ],
            badges: [
              { text: "CQC Outstanding",  color: "primary.turquoise" },
              { text: "98% Satisfaction", color: "primary.gold" },
            ],
          },
        },
        {
          name: "cta",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            maxWidth: "800px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              body: { font: "primary", size: "body.large", color: "neutrals.darkGray" },
            },
            buttons: [
              { type: "sparkleButton.primary", text: "Book Your Appointment", icon: "calendar.svg" },
              { type: "sparkleButton.secondary", text: "Call Us", icon: "phone.svg" },
            ],
          },
        },
      ],
    },

    contact: {
      sections: [
        {
          name: "hero",
          containerWidth: "100%",
          padding: "0",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "1200px",
            padding: "8rem 2rem",
            typography: {
              heading: { font: "secondary", size: "h1", color: "neutrals.white" },
              subheading: { font: "primary", size: "h4", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.gold", text: "Book Free Consultation", icon: "calendar.svg" },
              { type: "sparkleButton.emergency", text: "Emergency: 01273 453109", icon: "emergency.svg" },
            ],
          },
        },
        {
          name: "contact-methods",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 4, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                {
                  title: "Call Us",
                  content: "01273 453109",
                  details: "Mon-Fri 8:00-18:00, Sat 9:00-17:00",
                  icon: "phone.svg",
                  color: "primary.pink",
                  button: { text: "Call Now", type: "sparkleButton.primary" },
                },
                {
                  title: "Email Us",
                  content: "info@smhdental.co.uk",
                  details: "24/7 availability, 24hr response",
                  icon: "mail.svg",
                  color: "primary.turquoise",
                  button: { text: "Send Email", type: "sparkleButton.primary" },
                },
                {
                  title: "Live Chat",
                  content: "AI assistant available 24/7",
                  details: "Instant responses",
                  icon: "message-circle.svg",
                  color: "primary.gold",
                  button: { text: "Start Chat", type: "sparkleButton.primary" },
                },
                {
                  title: "Online Booking",
                  content: "24/7 booking availability",
                  details: "Instant confirmation",
                  icon: "calendar.svg",
                  color: "primary.pink",
                  button: { text: "Book Now", type: "sparkleButton.primary" },
                },
              ],
            },
          },
        },
        {
          name: "contact-form",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", opacity: 0.05, waves: true },
          content: {
            alignment: "center",
            layout: "twoColumn",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            form: {
              fields: [
                { type: "text", label: "First Name", required: true },
                { type: "text", label: "Last Name", required: true },
                { type: "email", label: "Email Address", required: true },
                { type: "tel", label: "Phone Number", required: true },
                {
                  type: "select",
                  label: "Treatment Interest",
                  options: ["General Check-up","Cosmetic Dentistry","3D Printed Veneers","Dental Implants","Emergency Care","Other"],
                  required: true,
                },
                {
                  type: "select",
                  label: "Preferred Time",
                  options: ["Morning","Afternoon","Evening","Weekend"],
                  required: true,
                },
                { type: "textarea", label: "Your Message", required: false },
                {
                  type: "checkbox",
                  label: "I consent to my data being processed in accordance with the Privacy Policy",
                  required: true,
                },
              ],
              button: { text: "Send Message & Book Consultation", type: "sparkleButton.primary" },
            },
            practiceInfo: {
              title: "Practice Information",
              address: "St Mary's House, St Mary's Road, Shoreham-by-Sea, BN43 5ZA",
              phone: "01273 453109",
              email: "info@smhdental.co.uk",
              hours: ["Monday - Friday: 8:00 - 18:00","Saturday: 9:00 - 17:00","Sunday: Closed"],
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
              },
            },
          },
        },
        {
          name: "emergency",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "emergency" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            emergencyInfo: {
              phone: "01273 453109",
              availability: "24/7 Emergency Care",
              message: "If you're experiencing severe pain, bleeding, or trauma, please call us immediately.",
              button: { text: "Call Emergency Line", type: "sparkleButton.emergency" },
              style: {
                background: "linear-gradient(135deg, rgba(255, 59, 48, 0.1) 0%, rgba(194, 24, 91, 0.1) 100%)",
                borderRadius: "radii.xl",
                border: "2px solid #FF3B30",
                padding: "2rem",
              },
            },
            stats: [
              { value: "24/7",   label: "Emergency Care",   icon: "clock.svg",  color: "emergency" },
              { value: "Same Day", label: "Appointments",     icon: "calendar.svg", color: "primary.pink" },
              { value: "5 Star", label: "Rating",            icon: "star.svg",  color: "primary.gold" },
              { value: "20+ Years", label: "Experience",     icon: "award.svg", color: "primary.turquoise" },
            ],
          },
        },
        {
          name: "map",
          containerWidth: "100%",
          padding: "0",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "primary.pink" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            map: {
              height: "500px",
              overlay: {
                title: "Easy to Find, Easy to Reach",
                address: "St Mary's House, St Mary's Road, Shoreham-by-Sea, BN43 5ZA",
                parking: "Free parking available on-site",
                transport: ["Bus routes: 2, 9, 46", "5 minutes from Shoreham Station"],
                style: {
                  background: "backgrounds.glass",
                  borderRadius: "radii.lg",
                  padding: "2rem",
                  effect: "effects.glassMorphism.light",
                },
              },
            },
          },
        },
        {
          name: "cta",
          containerWidth: "100%",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "gradients.pinkToTurquoise", waves: true },
          content: {
            alignment: "center",
            maxWidth: "800px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "neutrals.white" },
              body: { font: "primary", size: "body.large", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.gold", text: "Book Your Consultation", icon: "calendar.svg" },
              { type: "sparkleButton.secondary", text: "Call Us", icon: "phone.svg" },
            ],
          },
        },
      ],
    },

    "emergency-dentist": {
      sections: [
        {
          name: "hero",
          containerWidth: "100%",
          padding: "0",
          background: { type: "gradient", gradient: "linear-gradient(135deg, #FF3B30 0%, #C2185B 100%)", waves: true },
          content: {
            alignment: "center",
            maxWidth: "1200px",
            padding: "8rem 2rem",
            typography: {
              heading: { font: "secondary", size: "h1", color: "neutrals.white" },
              subheading: { font: "primary", size: "h4", color: "neutrals.white" },
            },
            buttons: [
              { type: "sparkleButton.emergency", text: "Call Emergency: 01273 453109", icon: "phone.svg" },
              { type: "sparkleButton.secondary", text: "Get Directions", icon: "map-pin.svg" },
            ],
          },
        },
        {
          name: "emergency-banner",
          containerWidth: "1200px",
          padding: "2rem",
          background: { type: "color", color: "emergency", waves: false },
          content: {
            alignment: "center",
            typography: { heading: { font: "primary", size: "h4", color: "neutrals.white" } },
            phone: "01273 453109",
            availability: "24/7 Emergency Hotline",
          },
        },
        {
          name: "emergency-situations",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "emergency" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            cards: {
              layout: "grid",
              columns: { desktop: 3, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                {
                  title: "Severe Tooth Pain",
                  badge: { text: "Immediate", color: "emergency" },
                  description: "Unbearable toothache prevention",
                  treatment: "Pain relief and diagnosis",
                  icon: "tooth-pain.svg",
                },
                {
                  title: "Dental Trauma",
                  badge: { text: "Immediate", color: "#FF9500" },
                  description: "Knocked-out or broken teeth",
                  treatment: "Emergency stabilization and preservation",
                  icon: "broken-tooth.svg",
                },
                {
                  title: "Facial Swelling",
                  badge: { text: "Urgent", color: "emergency" },
                  description: "Infection-related swelling",
                  treatment: "Antibiotic therapy and drainage",
                  icon: "swelling.svg",
                },
                {
                  title: "Bleeding Gums",
                  badge: { text: "Urgent", color: "primary.pink" },
                  description: "Persistent bleeding control",
                  treatment: "Wound care and treatment",
                  icon: "bleeding.svg",
                },
                {
                  title: "Lost Crown/Filling",
                  badge: { text: "Same Day", color: "#FF9500" },
                  description: "Restoration replacement",
                  treatment: "Temporary or permanent solutions",
                  icon: "crown.svg",
                },
                {
                  title: "Broken Dentures",
                  badge: { text: "Same Day", color: "#A2845E" },
                  description: "Emergency repair services",
                  treatment: "Temporary replacement options",
                  icon: "denture.svg",
                },
              ],
            },
          },
        },
        {
          name: "emergency-process",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "linear-gradient(135deg, rgba(255, 59, 48, 0.1) 0%, rgba(194, 24, 91, 0.1) 100%)", waves: true },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "emergency" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            steps: {
              layout: "grid",
              columns: { desktop: 4, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
                effect: "microAnimations.cardHover",
              },
              items: [
                { number: "1", title: "Call Immediately", description: "Contact our emergency line at 01273 453109", color: "emergency" },
                { number: "2", title: "Describe Symptoms", description: "Our team will assess the urgency of your situation", color: "primary.pink" },
                { number: "3", title: "Same-Day Appointment", description: "We'll see you as soon as possible", color: "primary.turquoise" },
                { number: "4", title: "Emergency Treatment", description: "Immediate care to resolve pain and issues", color: "primary.gold" },
              ],
            },
          },
        },
        {
          name: "first-aid",
          containerWidth: "1200px",
          padding: "6rem 2rem",
          background: { type: "color", color: "backgrounds.light", waves: false },
          content: {
            alignment: "center",
            typography: {
              heading: { font: "secondary", size: "h2", color: "emergency" },
              subheading: { font: "primary", size: "h5", color: "neutrals.darkGray" },
            },
            tips: {
              layout: "grid",
              columns: { desktop: 2, tablet: 2, mobile: 1 },
              gap: "2rem",
              style: {
                background: "backgrounds.white",
                borderRadius: "radii.xl",
                shadow: "shadows.lg",
                padding: "2rem",
              },
              items: [
                {
                  title: "Knocked-Out Tooth",
                  steps: [
                    "Handle the tooth by the crown, not the root",
                    "Rinse gently with milk or saline (don't scrub)",
                    "Try to reinsert the tooth if possible",
                    "If not, store in milk or saliva",
                    "Seek emergency dental care immediately",
                  ],
                  icon: "tooth.svg",
                  color: "emergency",
                },
                {
                  title: "Severe Toothache",
                  steps: [
                    "Rinse mouth with warm saltwater",
                    "Use dental floss to remove any trapped food",
                    "Apply cold compress for swelling",
                    "Take over-the-counter pain relief",
                    "Contact us immediately for emergency care",
                  ],
                  icon: "pain.svg",
                  color: "primary.pink",
                },
                {
                  title: "Broken Tooth",
                  steps: [
                    "Rinse mouth with warm water",
                    "Apply cold compress for swelling",
                    "Save any broken pieces",
                    "Cover sharp edges with dental wax if available",
                    "Contact us immediately",
                  ],
                  icon: "broken.svg",
                  color: "primary.turquoise",
                },
                {
                  title: "Lost Filling/Crown",
                  steps: [
                    "Save the crown if possible",
                    "Clean the crown gently",
                    "Use dental cement from pharmacy if available",
                    "Avoid chewing on that side",
                    "Contact us for same-day repair",
                  ],
                  icon: "crown.svg",
                  color: "primary.gold",
                },
              ],
            },
          },
        },
        {
          name: "why-choose-us",
          containerWidth: "100%",
          padding: "6rem 2rem",
          background: { type: "gradient", gradient: "linear-gradient(135deg, #FF3B30 0%, #C2185B 100%)", waves: true },
          content: {
            alignment: "center",
            maxWidth: "1200px",
            typography: {
              heading: { font: "secondary", size: "h2", color: "neutrals.white" },
              body: { font: "primary", size: "body.large", color: "neutrals.white" },
            },
            features: {
              layout: "grid",
              columns: { desktop: 3, tablet: 2, mobile: 1 },
              gap: "2rem",
              items: [
                { text: "24/7 Emergency Care", icon: "check.svg" },
                { text: "Same-Day Appointments", icon: "check.svg" },
                { text: "Experienced Emergency Team", icon: "check.svg" },
                { text: "Advanced Pain Management", icon: "check.svg" },
                { text: "Digital X-rays & Diagnosis", icon: "check.svg" },
                { text: "Immediate Pain Relief", icon: "check.svg" },
              ],
            },
            buttons: [
              { type: "sparkleButton.emergency", text: "Emergency: 01273 453109", icon: "phone.svg" },
              { type: "sparkleButton.secondary", text: "Get Directions", icon: "map-pin.svg" },
            ],
          },
        },
      ],
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/*  ASSETS (optional export, useful for renderers)                     */
/* ------------------------------------------------------------------ */

export const SMHAssets = {
  assets: {
    logos: {
      "logo-horizontal-white.svg": "Header (dark background)",
      "logo-horizontal-pink.svg": "Header (light background)",
      "logo-vertical-white.svg": "Footer, mobile menu",
      "logo-icon-white.svg": "Favicon, small spaces (dark background)",
      "logo-icon-pink.svg": "Favicon, small spaces (light background)",
    },
    backgrounds: {
      "waves-bg-2560.webp": "Wave background for hero sections",
      "waves-light-2560.webp": "Light wave background for content sections",
      "waves-dark-2560.webp": "Dark wave background for footer",
      "pattern-dots.svg": "Dot pattern for section backgrounds",
      "pattern-lines.svg": "Line pattern for section backgrounds",
    },
    icons: {
      treatment: {
        "tooth-shield.svg": "Preventive Care icon",
        "tooth-sparkle.svg": "Cosmetic Dentistry icon",
        "tooth-repair.svg": "Restorative Dentistry icon",
        "emergency.svg": "Emergency Care icon",
        "braces.svg": "Orthodontics icon",
        "specialist.svg": "Specialist Treatments icon",
      },
      ui: {
        "calendar.svg": "Booking/appointment icon",
        "phone.svg": "Contact/call icon",
        "mail.svg": "Email icon",
        "map-pin.svg": "Location icon",
        "clock.svg": "Hours/time icon",
        "check.svg": "Feature checkmark icon",
        "star.svg": "Rating/review icon",
        "users.svg": "Team/patients icon",
        "heart.svg": "Care/compassion icon",
        "shield.svg": "Protection/safety icon",
      },
      technology: {
        "3d-scanner.svg": "3D CBCT imaging technology card",
        "intraoral.svg": "Intraoral scanners technology card",
        "ai.svg": "AI-powered smile design technology card",
        "printer.svg": "Same-day 3D printing technology card",
        "laser.svg": "Laser dentistry technology card",
        "digital.svg": "Digital workflow technology card",
      },
      "social-icons": {
        "facebook.svg": "Footer social links",
        "instagram.svg": "Footer social links",
        "twitter.svg": "Footer social links",
        "youtube.svg": "Footer social links",
      },
    },
    illustrations: {
      "tooth-3d-healthy.glb": "3D tooth model (healthy)",
      "tooth-3d-cavity.glb": "3D tooth model (cavity)",
      "tooth-3d-crown.glb": "3D tooth model (crown)",
      "tooth-3d-implant.glb": "3D tooth model (implant)",
      "tooth-3d-veneer.glb": "3D tooth model (veneer)",
    },
    photos: {
      "hero-video.mp4": "Homepage hero section",
      "clinic-exterior.jpg": "About page, Contact page",
      "clinic-interior.jpg": "About page",
      "treatment-room.jpg": "Treatments page",
      "team-group.jpg": "Team page",
      "dr-maxwell.jpg": "Dr. Nick Maxwell profile",
      "dr-chen.jpg": "Dr. Sarah Chen profile",
      "dr-wright.jpg": "Dr. James Wright profile",
      "dental-assistant-1.jpg": "Dental assistant profile",
      "dental-assistant-2.jpg": "Dental assistant profile",
      "receptionist.jpg": "Receptionist profile",
    },
  },
} as const;
