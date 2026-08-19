import { type Locale, locales } from '@/lib/i18n'
import Hero from '@/components/sections/Hero'
import ClientLogos from '@/components/sections/ClientLogos'
import LiveStats from '@/components/sections/LiveStats'
import VideoSection from '@/components/sections/VideoSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ProductHighlights from '@/components/sections/ProductHighlights'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import ExportMap from '@/components/sections/ExportMap'
import Testimonials from '@/components/sections/Testimonials'
import Certifications from '@/components/sections/Certifications'
import CTASection from '@/components/sections/CTASection'
import { JsonLd } from '@/components/ui/JsonLd'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/lib/structuredData'

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
      <Hero lang={validLang} />
      <ClientLogos lang={validLang} />
      <LiveStats lang={validLang} />
      <VideoSection lang={validLang} />
      <WhyChooseUs lang={validLang} />
      <ProductHighlights lang={validLang} />
      <ProcessTimeline lang={validLang} />
      <ExportMap lang={validLang} />
      <Testimonials lang={validLang} />
      <Certifications lang={validLang} />
      <CTASection lang={validLang} />
    </>
  )
}
