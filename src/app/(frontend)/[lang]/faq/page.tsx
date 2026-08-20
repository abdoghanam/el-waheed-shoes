import { type Locale, locales } from '@/lib/i18n'
import { FAQPage } from '@/components/sections/FAQPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { faqSchema, breadcrumbSchema } from '@/lib/structuredData'

export const revalidate = 86400

const faqData = {
  en: [
    {
      question: 'What is your minimum order quantity (MOQ)?',
      answer: 'Our MOQ varies by product type. For standard designs, MOQ is 500 pairs per style. For custom OEM orders, MOQ starts at 1,000 pairs.',
    },
    {
      question: 'How long does production take?',
      answer: 'Standard production time is 30-45 days after order confirmation.',
    },
    {
      question: 'Do you offer samples?',
      answer: 'Yes, we provide samples before bulk orders. Sample cost is refundable upon placing a bulk order.',
    },
  ],
  ar: [
    {
      question: 'ما هي الحد الأدنى للطلب (MOQ)؟',
      answer: 'تختلف الحد الأدنى للطلب حسب نوع المنتج. للتصاميم العادية، الحد الأدنى 500 زوج لكل طراز. لطلبات OEM المخصصة، يبدأ الحد الأدنى من 1,000 زوج.',
    },
    {
      question: 'كم تستغرق عملية التصنيع؟',
      answer: 'مدة التصنيع العادية من 30 إلى 45 يوماً بعد تأكيد الطلب.',
    },
    {
      question: 'هل تقدمون عينات؟',
      answer: 'نعم، نقدم عينات قبل الطلبات بالجملة. تكلفة العينة قابلة للاسترداد عند تقديم طلب بالجملة.',
    },
  ],
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
    description:
      validLang === 'ar'
        ? 'الأسئلة الشائعة عن شركة الوحيد للاحذية وخدماتنا'
        : 'Frequently asked questions about EL WAHEED SHOES and our services.',
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const faqs = faqData[validLang] || faqData.en

  return (
    <>
      <JsonLd
        data={[
          faqSchema([...faqs]),
          breadcrumbSchema([
            { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
            { name: validLang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', url: `/${validLang}/faq` },
          ]),
        ]}
      />
      <FAQPage lang={validLang} />
    </>
  )
}
