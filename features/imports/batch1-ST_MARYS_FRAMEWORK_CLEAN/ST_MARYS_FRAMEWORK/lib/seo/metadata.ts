import { Metadata } from 'next'
import { seoConfig } from './config'

interface PageMetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  path: string
  image?: string
  noIndex?: boolean
  lastModified?: string
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path,
  image,
  noIndex = false,
  lastModified
}: PageMetadataProps): Metadata {
  const pageTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle
  const pageDescription = description || seoConfig.defaultDescription
  const pageKeywords = [...seoConfig.keywords, ...keywords]
  const pageUrl = `${seoConfig.siteUrl}${path}`
  const pageImage = image || '/images/og-default.jpg'

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: seoConfig.siteName,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: seoConfig.social.twitter,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: lastModified ? {
      'last-modified': lastModified,
    } : undefined,
  }
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  }
}

export function generateFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generatePersonJsonLd(person: {
  name: string
  jobTitle: string
  description: string
  image?: string
  qualifications?: string[]
  specialties?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    worksFor: {
      '@type': 'Dentist',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
    hasCredential: person.qualifications?.map((qual) => ({
      '@type': 'EducationalOccupationalCredential',
      name: qual,
    })),
    knowsAbout: person.specialties,
  }
}

export function generateMedicalProcedureJsonLd(procedure: {
  name: string
  description: string
  category: string
  duration?: string
  preparation?: string
  recovery?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: procedure.name,
    description: procedure.description,
    category: procedure.category,
    duration: procedure.duration,
    preparation: procedure.preparation,
    recovery: procedure.recovery,
    provider: {
      '@type': 'Dentist',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
  }
}

export function generateHowToJsonLd(howTo: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
  totalTime?: string
  estimatedCost?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
    provider: {
      '@type': 'Dentist',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
  }
}

export function generateBlogPostJsonLd(post: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/images/logo.png`,
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    image: post.image,
    url: post.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  }
}

