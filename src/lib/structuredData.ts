const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://el-waheed-shoes.vercel.app'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EL WAHEED SHOES',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      'Premium Egyptian footwear manufacturer specializing in OEM, private label, and wholesale shoe production.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressRegion: 'Egypt',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-111-409-3000',
      contactType: 'sales',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://www.facebook.com/elwaheedshoes',
      'https://www.linkedin.com/company/elwaheedshoes',
      'https://www.instagram.com/elwaheedshoes',
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'EL WAHEED SHOES Factory',
    image: `${SITE_URL}/og-image.svg`,
    url: SITE_URL,
    telephone: '+20-111-409-3000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.5573,
      longitude: 31.0118,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '17:00',
    },
    priceRange: '$$',
  }
}

export function websiteSchema(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EL WAHEED SHOES',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: lang === 'ar' ? 'ar' : 'en',
  }
}

export function productSchema(product: {
  name: string
  description: string
  image: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'EL WAHEED SHOES',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'EL WAHEED SHOES',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Contact for pricing',
      },
      seller: {
        '@type': 'Organization',
        name: 'EL WAHEED SHOES',
      },
    },
  }
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
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

export function blogPostSchema(post: {
  title: string
  description: string
  image: string
  datePublished: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.datePublished,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EL WAHEED SHOES',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  }
}
