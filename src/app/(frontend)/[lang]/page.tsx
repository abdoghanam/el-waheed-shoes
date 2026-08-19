import { type Locale, locales } from '@/lib/i18n'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import { JsonLd } from '@/components/ui/JsonLd'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary'
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/lib/structuredData'

const ClientLogos = dynamic(() => import('@/components/sections/ClientLogos'), { ssr: true })
const LiveStats = dynamic(() => import('@/components/sections/LiveStats'), { ssr: true })
const VideoSection = dynamic(() => import('@/components/sections/VideoSection'), { ssr: false })
const WhyChooseUs = dynamic(() => import('@/components/sections/WhyChooseUs'), { ssr: true })
const ProductHighlights = dynamic(() => import('@/components/sections/ProductHighlights'), { ssr: true })
const ProcessTimeline = dynamic(() => import('@/components/sections/ProcessTimeline'), { ssr: false })
const ExportMap = dynamic(() => import('@/components/sections/ExportMap'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true })
const Certifications = dynamic(() => import('@/components/sections/Certifications'), { ssr: false })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title:
      validLang === 'ar'
        ? 'الوحيد للاحذية | تصنيع أحذية مصري'
        : 'EL WAHEED SHOES | Premium Egyptian Footwear',
    description:
      validLang === 'ar'
        ? 'تصنيع مصري فاخر للأحذية منذ 2010. أكثر من 15 عاماً من التميز في التصنيع. طلبات بالجملة والعلامة التجارية الخاصة.'
        : 'Premium Egyptian footwear manufacturer since 2010. 15+ years of manufacturing excellence. Wholesale, OEM, and private label footwear production.',
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return (
    <>
      <JsonLd
        data={[organizationSchema(), localBusinessSchema(), websiteSchema(validLang)]}
      />
      <Breadcrumb items={[]} lang={validLang} />
      <SectionErrorBoundary name="hero">
        <Hero lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="clientLogos">
        <ClientLogos lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="liveStats">
        <LiveStats lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="videoSection">
        <VideoSection lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="whyChooseUs">
        <WhyChooseUs lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="productHighlights">
        <ProductHighlights lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="processTimeline">
        <ProcessTimeline lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="exportMap">
        <ExportMap lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="testimonials">
        <Testimonials lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="certifications">
        <Certifications lang={validLang} />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="ctaSection">
        <CTASection lang={validLang} />
      </SectionErrorBoundary>
    </>
  )
}
