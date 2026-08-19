import { type Locale, locales } from '@/lib/i18n'
import OEMPage from '@/components/sections/OEMPage'
import { JsonLd } from '@/components/ui/JsonLd'
import {
  organizationSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/structuredData'

const oemFaqsEn = [
  {
    question: 'What is OEM footwear manufacturing?',
    answer:
      'OEM (Original Equipment Manufacturing) is a service where we manufacture shoes based on your design specifications, branding, and requirements.',
  },
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Our MOQ varies by product type. Contact us for specific details regarding your footwear category.',
  },
  {
    question: 'Do you offer private label services?',
    answer:
      'Yes, we provide complete private label services including custom branding, packaging, and label design.',
  },
]

const oemFaqsAr = [
  {
    question: 'ما هو تصنيع الأحذية بالوكالة (OEM)؟',
    answer:
      'تصنيع بالوكالة هو خدمة نقوم فيها بتصنيع الأحذية وفقاً لمواصفاتك وعلامتك التجارية ومتطلباتك.',
  },
  {
    question: 'ما هو الحد الأدنى للطلب (MOQ)؟',
    answer:
      'الحد الأدنى للطلب يختلف حسب نوع المنتج. اتصل بنا للحصول على تفاصيل محددة.',
  },
  {
    question: 'هل تقدمون خدمات العلامة التجارية الخاصة؟',
    answer:
      'نعم، نقدم خدمات العلامة التجارية الخاصة الكاملة بما في ذلك التغليف والتصميم المخصص.',
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'تصنيع بالوكالة OEM' : 'OEM Manufacturing',
    description:
      validLang === 'ar'
        ? 'خدمات تصنيع الأحذية بالوكالة والعلامة التجارية الخاصة'
        : 'OEM and private label footwear manufacturing services.',
    alternates: {
      languages: {
        en: '/en/oem',
        ar: '/ar/oem',
      },
    },
  }
}

export default async function OEM({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
            { name: validLang === 'ar' ? 'تصنيع بالوكالة OEM' : 'OEM Manufacturing', url: `/${validLang}/oem` },
          ]),
          faqSchema(validLang === 'ar' ? oemFaqsAr : oemFaqsEn),
        ]}
      />
      <OEMPage lang={validLang} />
    </>
  )
}
