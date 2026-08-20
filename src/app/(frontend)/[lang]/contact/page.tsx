import { type Locale, locales } from '@/lib/i18n'
import ContactPage from '@/components/sections/ContactPage'
import { JsonLd } from '@/components/ui/JsonLd'
import {
  localBusinessSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/structuredData'

export const revalidate = 3600

const contactFaqsEn = [
  {
    question: 'How can I request a quote?',
    answer:
      'You can request a quote through our contact page or by calling us directly at +20-111-409-3000.',
  },
  {
    question: 'Where is your factory located?',
    answer:
      'Our factory is located in Egypt. Contact us for the exact address and visiting arrangements.',
  },
]

const contactFaqsAr = {
  contactFaqsAr: [
    {
      question: 'كيف يمكنني طلب عرض سعر؟',
      answer:
        'يمكنك طلب عرض سعر من خلال صفحة الاتصال أو بالاتصال بنا مباشرة على +20-111-409-3000.',
    },
    {
      question: 'أين يقع مصنعكم؟',
      answer:
        'يقع مصنعنا في مصر. اتصل بنا للحصول على العنوان الدقيق وترتيب الزيارة.',
    },
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'اتصل بنا' : 'Contact Us',
    description:
      validLang === 'ar'
        ? 'تواصل مع شركة الوحيد للاحذية للاستفسارات وطلبات التسعير'
        : 'Contact EL WAHEED SHOES for inquiries and quote requests.',
    alternates: {
      languages: {
        en: '/en/contact',
        ar: '/ar/contact',
      },
    },
  }
}

export default async function Contact({
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
          localBusinessSchema(),
          breadcrumbSchema([
            { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
            { name: validLang === 'ar' ? 'اتصل بنا' : 'Contact Us', url: `/${validLang}/contact` },
          ]),
          faqSchema(validLang === 'ar' ? contactFaqsAr.contactFaqsAr : contactFaqsEn),
        ]}
      />
      <ContactPage lang={validLang} />
    </>
  )
}
