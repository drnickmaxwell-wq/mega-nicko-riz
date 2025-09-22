import type { Metadata } from 'next'
import { Montserrat, Lora } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/FooterFuture'
import { WaveBackgroundLayout } from '@/components/layout/WaveBackgroundLayout'
import { SkipLink } from '@/components/ui/SkipLink'
import { seoConfig } from '@/lib/seo/config'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: seoConfig.siteUrl,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    siteName: seoConfig.siteName,
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: ['/images/twitter-card.jpg'],
    creator: '@StMarysHouseDental',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/montserrat-v25-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/lora-v32-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#C2185B" />
        <meta name="msapplication-TileColor" content="#C2185B" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SkipLink />
        
        <>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            
            <main id="main-content" className="flex-1">
              {children}
            </main>
            
            <Footer />
          </div>
        </>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "St Mary's House Dental Care",
              "description": "Luxury coastal dentistry practice in Shoreham-by-Sea offering advanced dental treatments with exceptional patient care.",
              "url": "https://stmaryshousedental.co.uk",
              "logo": "https://stmaryshousedental.co.uk/images/logo.png",
              "image": "https://stmaryshousedental.co.uk/images/practice-exterior.jpg",
              "telephone": "+441273453109",
              "email": "info@stmaryshousedental.co.uk",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 High Street",
                "addressLocality": "Shoreham-by-Sea",
                "addressRegion": "West Sussex",
                "postalCode": "BN43 5DA",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "50.8322",
                "longitude": "-0.2736"
              },
              "openingHours": [
                "Mo-Fr 08:00-18:00",
                "Sa 09:00-17:00"
              ],
              "priceRange": "£££",
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Insurance"],
              "currenciesAccepted": "GBP",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "50.8322",
                  "longitude": "-0.2736"
                },
                "geoRadius": "25000"
              },
              "medicalSpecialty": [
                "Cosmetic Dentistry",
                "Dental Implants",
                "Teeth Whitening",
                "Emergency Dentistry",
                "Preventive Dentistry"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional License",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "General Dental Council"
                }
              },
              "sameAs": [
                "https://www.facebook.com/StMarysHouseDental",
                "https://www.instagram.com/stmaryshousedental",
                "https://www.linkedin.com/company/st-marys-house-dental-care",
                "https://twitter.com/StMarysHouseDental"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}

