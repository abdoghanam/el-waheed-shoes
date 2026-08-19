'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'

type FAQCategory = 'general' | 'products' | 'manufacturing' | 'shipping' | 'oem'

interface FAQItem {
  question: { en: string; ar: string }
  answer: { en: string; ar: string }
}

const faqData: Record<FAQCategory, FAQItem[]> = {
  general: [
    {
      question: { en: 'What is your minimum order quantity (MOQ)?', ar: 'ما هو الحد الأدنى للطلب (MOQ)؟' },
      answer: { en: 'Our MOQ varies by product type. For standard designs, MOQ is 500 pairs per style. For custom OEM orders, MOQ starts at 1,000 pairs.', ar: 'يختلف الحد الأدنى للطلب حسب نوع المنتج. للتصاميم العادية، الحد الأدنى 500 زوج لكل طراز. للطلبات المخصصة OEM، يبدأ من 1,000 زوج.' },
    },
    {
      question: { en: 'What payment methods do you accept?', ar: 'ما هي طرق الدفع المقبولة؟' },
      answer: { en: 'We accept T/T bank transfer, L/C for large orders, and Western Union for smaller transactions.', ar: 'نقبل تحويل بنكي T/T، وخطاب اعتماد L/C للطلبات الكبيرة، وويسترن يونيون للمعاملات الصغيرة.' },
    },
    {
      question: { en: 'Do you offer samples?', ar: 'هل تقدمون عينات؟' },
      answer: { en: 'Yes, we provide samples before bulk orders. Sample cost is refundable upon placing a bulk order.', ar: 'نعم، نقدم عينات قبل الطلبات بالجملة. تكلفة العينة مستردة عند تقديم طلب بالجملة.' },
    },
    {
      question: { en: 'What quality certifications do you have?', ar: 'ما هي شهادات الجودة التي تمتلكونها؟' },
      answer: { en: 'We hold ISO 9001:2015 and CE certifications. Our quality control team inspects every batch.', ar: 'نمتلك شهادات ISO 9001:2015 و CE. يفحص فريق مراقبة الجودة لدينا كل دفعة.' },
    },
  ],
  products: [
    {
      question: { en: 'What types of footwear do you manufacture?', ar: 'ما هي أنواع الأحذية التي تصنعونها؟' },
      answer: { en: 'We produce casual shoes, sport shoes, formal shoes, safety boots, sandals, boots, and children\'s footwear.', ar: 'ننتج الأحذية الكاجوية، والرياضية، والرسمية، وأحذية السلامة، والشباشب، والبوت، وأحذية الأطفال.' },
    },
    {
      question: { en: 'What materials do you work with?', ar: 'ما هي المواد التي تتعاملون معها؟' },
      answer: { en: 'We work with genuine leather, synthetic leather (PU/PVC), canvas, mesh, rubber, EVA, and many more materials based on your requirements.', ar: 'نعمل مع الجلد الطبيعي، والجلد الصناعي (PU/PVC)، والقماش، والشبك، والمطاط، وEVA، والمزيد من المواد وفقاً لمتطلباتك.' },
    },
    {
      question: { en: 'Can I see examples of your previous work?', ar: 'هل يمكنني رؤية أمثلة من أعمالكم السابقة؟' },
      answer: { en: 'Yes, you can browse our Gallery page for photos of our factory and product samples. We can also share additional references upon request.', ar: 'نعم، يمكنك تصفح صفحة المعرض لصور مصنعنا وعينات المنتجات. يمكننا أيضاً مشاركة مراجع إضافية عند الطلب.' },
    },
  ],
  manufacturing: [
    {
      question: { en: 'What is your monthly production capacity?', ar: 'ما هي طاقتك الإنتاجية الشهرية؟' },
      answer: { en: 'Our factory produces 25,000+ pairs per month across all product lines, with room for expansion.', ar: 'ينتج مصنعنا أكثر من 25,000 زوج شهرياً عبر جميع خطوط الإنتاج، مع مجال للتوسع.' },
    },
    {
      question: { en: 'How do you ensure quality?', ar: 'كيف تضمنون الجودة؟' },
      answer: { en: 'We have a multi-stage QC process: raw material inspection, in-line checks, and final inspection before packing.', ar: 'لدينا عملية مراقبة جودة متعددة المراحل: فحص المواد الخام، وفحوصات على خط الإنتاج، والفحص النهائي قبل التعبئة.' },
    },
    {
      question: { en: 'How long does production take?', ar: 'كم يستغرق الإنتاج؟' },
      answer: { en: 'Standard production time is 30-45 days after order confirmation. Rush orders may be available with additional cost.', ar: 'وقت الإنتاج العادي 30-45 يوماً بعد تأكيد الطلب. قد تتوفر الطلبات المستعفة بتكلفة إضافية.' },
    },
    {
      question: { en: 'What is your defect rate?', ar: 'ما هي نسبة العيوب؟' },
      answer: { en: 'Our defect rate consistently stays below 1.5% — well under the industry average. Every production line has dedicated quality inspectors.', ar: 'نسبة العيوب لدينا لا تتجاوز 1.5% باستمرار — وهي أقل بكثير من المتوسط الصناعي.' },
    },
  ],
  shipping: [
    {
      question: { en: 'Do you ship internationally?', ar: 'هل تشحنون دولياً؟' },
      answer: { en: 'Yes, we export worldwide. We have experience shipping to Europe, Middle East, Africa, and the Americas.', ar: 'نعم، نصدر إلى جميع أنحاء العالم. لدينا خبرة في الشحن إلى أوروبا والشرق الأوسط وأفريقيا والأمريكتين.' },
    },
    {
      question: { en: 'What shipping methods do you use?', ar: 'ما هي طرق الشحن التي تستخدمونها؟' },
      answer: { en: 'We work with major freight forwarders and shipping lines. We support both FCL and LCL shipments based on order volume.', ar: 'نعمل مع شركات الشحن الرئيسية وخطوط الشحن. ندعم شحنات FCL وLCL بناءً على حجم الطلب.' },
    },
    {
      question: { en: 'Can you handle customs documentation?', ar: 'هل يمكنكم التعامل على التوثيق الجمركي؟' },
      answer: { en: 'Yes, we provide all necessary export documentation including commercial invoices, packing lists, and certificates of origin.', ar: 'نعم، نقدم جميع الوثائق التصديرية اللازمة بما في ذلك الفواتير التجارية وقوائم التعبئة وشهادات المنشأ.' },
    },
  ],
  oem: [
    {
      question: { en: 'Can you manufacture our custom designs?', ar: 'هل يمكنكم تصنيع تصاميمنا المخصصة؟' },
      answer: { en: 'Absolutely. Our OEM service covers everything from design consultation to final production. We work with your specs, materials, and branding.', ar: 'بالطبع. تغطي خدمة OEM لدينا كل شيء من الاستشارات التصميمية إلى الإنتاج النهائي. نعمل مع مواصفاتك وموادك وعلامتك التجارية.' },
    },
    {
      question: { en: 'Do you handle packaging and labeling?', ar: 'هل تتولون التعبئة والوضع؟' },
      answer: { en: 'Yes, we provide complete private label services including custom packaging, labeling, hang tags, and branded boxes.', ar: 'نعم، نقدم خدمات العلامة الخاصة الكاملة بما في ذلك التعبئة المخصصة والوضع والبطاقات المعلقة والمغلفات المعتمدة.' },
    },
    {
      question: { en: 'What is the OEM process from start to finish?', ar: 'ما هي عملية OEM من البداية إلى النهاية؟' },
      answer: { en: '1) Share your designs/specs, 2) We provide a quote and timeline, 3) Sample production and approval, 4) Mass production, 5) Quality inspection, 6) Packaging and shipping.', ar: '1) شارك تصاميمك/مواصفاتك، 2) نقدم عرض سعر وجدولاً زمنياً، 3) إنتاج العينات والموافقة، 4) الإنتاج الضخم، 5) فحص الجودة، 6) التعبئة والشحن.' },
    },
  ],
}

const categoryLabels: Record<FAQCategory, { en: string; ar: string }> = {
  general: { en: 'General', ar: 'عام' },
  products: { en: 'Products', ar: 'المنتجات' },
  manufacturing: { en: 'Manufacturing', ar: 'التصنيع' },
  shipping: { en: 'Shipping', ar: 'الشحن' },
  oem: { en: 'OEM', ar: 'التصنيع بالوكالة' },
}

const categoryOrder: FAQCategory[] = ['general', 'products', 'manufacturing', 'shipping', 'oem']

export function FAQPage({ lang }: { lang: Locale }) {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'

  const filteredItems = useMemo(() => {
    return faqData[activeCategory].map((item) => ({ ...item, category: activeCategory }))
  }, [activeCategory, lang])

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'الأسئلة الشائعة' : 'FAQ' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'الأسئلة الشائعة' : 'FAQ'}
          title={isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          description={isAr ? 'إجابات على الأسئلة الأكثر تكراراً' : 'Answers to the most commonly asked questions'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenIndex(null)
                }}
                className={`body-sm px-4 py-2 rounded-full transition-colors ${
                  activeCategory === cat
                    ? 'text-accent border border-border-gold'
                    : 'text-text-muted border border-transparent hover:text-text-primary'
                }`}
              >
                {categoryLabels[cat][lang]}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredItems.map((item, i) => (
              <div key={`${item.category}-${i}`} className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="heading-sm text-sm pr-4 group-hover:text-accent transition-colors">
                    {item.question[lang]}
                  </span>
                  <motion.span
                    className="shrink-0 text-accent"
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
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 body-md">
                        {item.answer[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
