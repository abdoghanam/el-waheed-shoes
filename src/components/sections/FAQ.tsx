'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { type Locale } from '@/lib/i18n'

type FAQVariant = 'contact' | 'oem' | 'manufacturing'

interface FAQItem {
  question: { en: string; ar: string }
  answer: { en: string; ar: string }
}

const faqData: Record<FAQVariant, FAQItem[]> = {
  contact: [
    {
      question: {
        en: 'What is your minimum order quantity (MOQ)?',
        ar: 'ما هو الحد الأدنى للطلب (MOQ)؟',
      },
      answer: {
        en: 'Our MOQ varies by product type. For standard designs, MOQ is 500 pairs per style. For custom OEM orders, MOQ starts at 1,000 pairs.',
        ar: 'يختلف الحد الأدنى للطلب حسب نوع المنتج. للتصاميم العادية، الحد الأدنى 500 زوج لكل طراز. للطلبات المخصصة OEM، يبدأ من 1,000 زوج.',
      },
    },
    {
      question: {
        en: 'How long does production take?',
        ar: 'كم يستغرق الإنتاج؟',
      },
      answer: {
        en: 'Standard production time is 30-45 days after order confirmation. Rush orders may be available with additional cost.',
        ar: 'وقت الإنتاج العادي 30-45 يوماً بعد تأكيد الطلب. قد تتوفر الطلبات المستعفة بتكلفة إضافية.',
      },
    },
    {
      question: {
        en: 'Do you offer samples?',
        ar: 'هل تقدمون عينات؟',
      },
      answer: {
        en: 'Yes, we provide samples before bulk orders. Sample cost is refundable upon placing a bulk order.',
        ar: 'نعم، نقدم عينات قبل الطلبات بالجملة. تكلفة العينة مستردة عند تقديم طلب بالجملة.',
      },
    },
    {
      question: {
        en: 'What payment methods do you accept?',
        ar: 'ما هي طرق الدفع المقبولة؟',
      },
      answer: {
        en: 'We accept T/T bank transfer, L/C for large orders, and Western Union for smaller transactions.',
        ar: 'نقبل تحويل بنكي T/T، وخطاب اعتماد L/C للطلبات الكبيرة، وويسترن يونيون للمعاملات الصغيرة.',
      },
    },
  ],
  oem: [
    {
      question: {
        en: 'Can you manufacture our custom designs?',
        ar: 'هل يمكنكم تصنيع تصاميمنا المخصصة؟',
      },
      answer: {
        en: 'Absolutely. Our OEM service covers everything from design consultation to final production. We work with your specs, materials, and branding.',
        ar: 'بالطبع. تغطي خدمة OEM لدينا كل شيء من الاستشارات التصمية إلى الإنتاج النهائي. نعمل مع مواصفاتك وموادك وعلامتك التجارية.',
      },
    },
    {
      question: {
        en: 'What materials do you work with?',
        ar: 'ما هي المواد التي تتعاملون معها؟',
      },
      answer: {
        en: 'We work with genuine leather, synthetic leather (PU/PVC), canvas, mesh, rubber, EVA, and many more materials based on your requirements.',
        ar: 'نعمل مع الجلد الطبيعي، والجلد الصناعي (PU/PVC)، والقماش، والشبك، والمطاط، وEVA، والمزيد من المواد وفقاً لمتطلباتك.',
      },
    },
    {
      question: {
        en: 'Do you handle packaging and labeling?',
        ar: 'هل تتولون التعبئة والوضع؟',
      },
      answer: {
        en: 'Yes, we provide complete private label services including custom packaging, labeling, hang tags, and branded boxes.',
        ar: 'نعم، نقدم خدمات العلامة الخاصة الكاملة بما في ذلك التعبئة المخصصة والوضع والبطاقات المعلقة والمغلفات المعتمدة.',
      },
    },
    {
      question: {
        en: 'What quality certifications do you have?',
        ar: 'ما هي شهادات الجودة التي تمتلكونها؟',
      },
      answer: {
        en: 'We hold ISO 9001:2015 and CE certifications. Our quality control team inspects every batch.',
        ar: 'نمتلك شهادات ISO 9001:2015 و CE. يفحص فريق مراقبة الجودة لدينا كل دفعة.',
      },
    },
  ],
  manufacturing: [
    {
      question: {
        en: 'What types of footwear do you manufacture?',
        ar: 'ما هي أنواع الأحذية التي تصنعونها؟',
      },
      answer: {
        en: 'We produce casual shoes, sport shoes, formal shoes, safety boots, sandals, boots, and children\'s footwear.',
        ar: 'ننتج الأحذية الكاجوية، والرياضية، والرسمية، وأحذية السلامة، والشباشب، والبوت، وأحذية الأطفال.',
      },
    },
    {
      question: {
        en: 'What is your monthly production capacity?',
        ar: 'ما هي طاقتك الإنتاجية الشهرية؟',
      },
      answer: {
        en: 'Our factory produces 25,000+ pairs per month across all product lines, with room for expansion.',
        ar: 'ينتج مصنعنا أكثر من 25,000 زوج شهرياً عبر جميع خطوط الإنتاج، مع مجال للتوسع.',
      },
    },
    {
      question: {
        en: 'How do you ensure quality?',
        ar: 'كيف تضمنون الجودة؟',
      },
      answer: {
        en: 'We have a multi-stage QC process: raw material inspection, in-line checks, and final inspection before packing.',
        ar: 'لدينا عملية مراقبة جودة متعددة المراحل: فحص المواد الخام، وفحوصات على خط الإنتاج، والفحص النهائي قبل التعبئة.',
      },
    },
  ],
}

const variantTitles: Record<FAQVariant, { en: string; ar: string }> = {
  contact: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
  oem: { en: 'OEM Frequently Asked Questions', ar: 'أسئلة شائعة حول التصنيع' },
  manufacturing: { en: 'Manufacturing FAQs', ar: 'أسئلة شائعة حول التصنيع' },
}

export default function FAQ({
  lang,
  variant,
}: {
  lang: Locale
  variant: FAQVariant
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = faqData[variant]
  const title = variantTitles[variant]

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
          {title[lang]}
        </h2>
        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i} className="border-b border-gray-800">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group min-h-[44px]"
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="text-base font-semibold text-white group-hover:text-gold transition-colors pr-4">
                  {item.question[lang]}
                </span>
                <motion.span
                  className="shrink-0 text-gold"
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                    <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-gray-400 leading-relaxed">
                      {item.answer[lang]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
