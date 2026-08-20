'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { type Locale } from '@/lib/i18n'
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
      question: {
        en: 'What types of footwear do you manufacture?',
        ar: 'ما هي أنواع الأحذية التي تصنعونها؟',
      },
      answer: {
        en: 'We produce casual shoes, formal dress shoes, sport/athletic shoes, safety boots, sandals, and boots. Our product range covers men\'s, women\'s, and kids\' footwear across all major categories.',
        ar: 'ننتج الأحذية غير الرسمية، والأحذية الرسمية، والأحذية الرياضية، وأحذية السلامة، والشباشب، والبوت. تغطي منتجاتنا أحذية الرجال والنساء والأطفال عبر جميع الفئات الرئيسية.',
      },
    },
    {
      question: {
        en: 'Where is your factory located?',
        ar: 'أين يقع مصنعكم؟',
      },
      answer: {
        en: 'Our manufacturing facility is located in El Mahalla El Kubra, Gharbia Governorate, Egypt — one of the country\'s major industrial hubs with excellent logistics connections to Alexandria and Cairo ports.',
        ar: 'يوجد منشأة التصنيع الخاصة بنا في مدينة المحلة الكبرى، محافظة الغربية، مصر — وهي واحدة من المراكز الصناعية الرئيسية في البلاد مع روابط لوجستية ممتازة إلى ميناء الإسكندرية والقاهرة.',
      },
    },
    {
      question: {
        en: 'What is your minimum order quantity (MOQ)?',
        ar: 'ما هو الحد الأدنى للطلب (MOQ)؟',
      },
      answer: {
        en: 'Our standard MOQ is 500 pairs per style for stock orders and 1,000 pairs for OEM/private label production. We offer flexible MOQ options for sample orders and new client partnerships.',
        ar: 'الحد الأدنى القياسي للطلب هو 500 زوج لكل طراز للطلبات المتوفرة و1,000 زوج للتصنيع بالوكالة أو بالعلامة التجارية الخاصة. نقدم خيارات مرنة للحد الأدنى فيما يتعلق بطلبات العينات والشراكات الجديدة مع العملاء.',
      },
    },
    {
      question: {
        en: 'How do I get a quote?',
        ar: 'كيف أحصل على عرض سعر؟',
      },
      answer: {
        en: 'Submit your requirements through our quote request form or contact us directly via WhatsApp. We typically respond within 24 hours with a detailed manufacturing proposal including pricing, timeline, and sample information.',
        ar: 'أرسل متطلباتك من خلال نموذج طلب عرض السعر أو تواصل معنا مباشرة عبر واتساب. نرد عادةً خلال 24 ساعة بعرض تصنيع مفصل يشمل الأسعار والجدول الزمني ومعلومات العينات.',
      },
    },
  ],
  products: [
    {
      question: {
        en: 'What materials do you work with?',
        ar: 'ما هي المواد التي تتعاملون معها؟',
      },
      answer: {
        en: 'We work with genuine leather (cowhide, nubuck, suede), PU/PVC synthetic leather, canvas, mesh, rubber, EVA foam, and various textile materials. All materials meet REACH, OEKO-TEX, and ISO 9001 standards.',
        ar: 'نعمل مع الجلد الطبيعي (جلد البقر، والنوبوك، والسuede)، والجلد الصناعي (PU/PVC)، والقماش القطني، والشبك، والمطاط، ورغوة EVA، ومختلف مواد النسيج. تلبي جميع المواد معايير REACH وOEKO-TEX وISO 9001.',
      },
    },
    {
      question: {
        en: 'Can I request product samples before placing a bulk order?',
        ar: 'هل يمكنني طلب عينات من المنتجات قبل تقديم طلب بالجملة؟',
      },
      answer: {
        en: 'Yes. We offer sample production for a nominal fee (typically $50-150 per sample depending on complexity). Samples are produced within 7-10 working days and shipped internationally via DHL or FedEx.',
        ar: 'نعم. نقدم إنتاج العينات مقابل رسوم رمزية (عادةً من 50 إلى 150 دولاراً لكل عينة حسب التعقيد). تُنتج العينات خلال 7 إلى 10 أيام عمل وتشحن دولياً عبر DHL أو FedEx.',
      },
    },
    {
      question: {
        en: 'What sizes do you produce?',
        ar: 'ما هي الأحجام التي تنتجونها؟',
      },
      answer: {
        en: 'We produce EU sizes 36-47 for adults and EU 24-35 for kids. Custom sizing is available for OEM orders. Our size guide is available on our website for reference.',
        ar: 'ننتج أحجام EU من 36 إلى 47 للبالغين و24 إلى 35 للأطفال. تتوفر أحجام مخصصة لطلبات التصنيع بالوكالة. دليل الأحجام متاح على موقعنا الإلكتروني للمراجعة.',
      },
    },
    {
      question: {
        en: 'What quality certifications do you hold?',
        ar: 'ما هي شهادات الجودة التي تمتلكونها؟',
      },
      answer: {
        en: 'We hold ISO 9001:2015 (Quality Management), ISO 14001 (Environmental Management), and CE certification. Our safety footwear meets S3 SRC standards. We can pursue additional certifications per client requirements.',
        ar: 'نمتلك شهادة ISO 9001:2015 (إدارة الجودة)، وISO 14001 (إدارة البيئة)، وشهادة CE. تلبي أحذية السلامة لدينا معايير S3 SRC. يمكننا الحصول على شهادات إضافية وفقاً لمتطلبات العميل.',
      },
    },
  ],
  manufacturing: [
    {
      question: {
        en: 'What is your production lead time?',
        ar: 'ما هو وقت التسليم للإنتاج؟',
      },
      answer: {
        en: 'Standard production takes 30-45 days from order confirmation and sample approval. OEM orders with custom designs may take 45-60 days. Rush orders are available at additional cost.',
        ar: 'يستغرق الإنتاج القياسي من 30 إلى 45 يوماً من تاريخ تأكيد الطلب والموافقة على العينات. قد تستغرق طلبات التصنيع بالوكالة مع التصاميم المخصصة من 45 إلى 60 يوماً. تتوفر الطلبات المستعفة بتكلفة إضافية.',
      },
    },
    {
      question: {
        en: 'What is your monthly production capacity?',
        ar: 'ما هي طاقتك الإنتاجية الشهرية؟',
      },
      answer: {
        en: 'Our factory produces 25,000+ pairs per month across all product lines, with a daily capacity of approximately 900 pairs. We operate with 120+ skilled workers on modern production lines.',
        ar: 'ينتج مصنعنا أكثر من 25,000 زوج شهرياً عبر جميع خطوط الإنتاج، بطاقة يومية تبلغ حوالي 900 زوج. نعمل بأكثر من 120 عاملاً مدرباً على خطوط إنتاج حديثة.',
      },
    },
    {
      question: {
        en: 'How do you ensure quality during production?',
        ar: 'كيف تضمنون الجودة أثناء الإنتاج؟',
      },
      answer: {
        en: 'We implement a 7-stage quality control process: raw material inspection, cutting accuracy check, stitching quality monitoring, assembly verification, in-line inspection, final product assessment, and pre-shipment audit.',
        ar: 'نطبق عملية مراقبة جودة من 7 مراحل: فحص المواد الخام، والتحقق من دقة القطع، ومراقبة جودة الغرز، والتحقق من التجميع، والفحص على خط الإنتاج، وتقييم المنتج النهائي، والتدقيق قبل الشحن.',
      },
    },
    {
      question: {
        en: 'Can you handle custom designs and OEM orders?',
        ar: 'هل يمكنكم التعامل مع التصاميم المخصصة وطلبات التصنيع بالوكالة؟',
      },
      answer: {
        en: 'Absolutely. We offer full OEM and private label services including custom design development, prototype sampling, branded packaging, and quality certification. Our in-house design team works closely with clients from concept to production.',
        ar: 'بالتأكيد. نقدم خدمات التصنيع بالوكالة والعلامة التجارية الخاصة الكاملة بما في ذلك تطوير التصاميم المخصصة، وإنتاج العينات الأولية، والتعبئة المعتمدة، وشهادات الجودة. يعمل فريق التصميم الداخلي لدينا بشكل وثيق مع العملاء من مرحلة الفكرة إلى مرحلة الإنتاج.',
      },
    },
  ],
  shipping: [
    {
      question: {
        en: 'Which countries do you export to?',
        ar: 'ما هي الدول التي تصدرون إليها؟',
      },
      answer: {
        en: 'We export to 20+ countries across the Middle East, Europe, Africa, and Asia. Key markets include UAE, Saudi Arabia, Germany, UK, France, Libya, and China. We handle all export documentation and logistics.',
        ar: 'نصدر إلى أكثر من 20 دولة في الشرق الأوسط وأوروبا وأفريقيا وآسيا. تشمل الأسواق الرئيسية الإمارات العربية المتحدة، المملكة العربية السعودية، ألمانيا، المملكة المتحدة، فرنسا، ليبيا، والصين. نتولى جميع الوثائق التصديرية والخدمات اللوجستية.',
      },
    },
    {
      question: {
        en: 'What payment methods do you accept?',
        ar: 'ما هي طرق الدفع المقبولة؟',
      },
      answer: {
        en: 'We accept T/T bank transfer (standard), Letter of Credit (L/C) for large orders, and Western Union for smaller transactions. Typical terms: 30% deposit with order, 70% balance before shipment.',
        ar: 'نقبل التحويل البنكي (T/T) كطريقة قياسية، وخطاب الاعتماد (L/C) للطلبات الكبيرة، وويسترن يونيون للمعاملات الأصغر. الشروط المعتادة: دفعة مقدمة 30% عند الطلب، ورصيد 70% قبل الشحن.',
      },
    },
    {
      question: {
        en: 'Do you handle shipping and logistics?',
        ar: 'هل تتولون الشحن والخدمات اللوجستية؟',
      },
      answer: {
        en: 'Yes. We arrange FOB and CIF shipping from Alexandria and Cairo ports. We work with major freight forwarders for sea freight, and DHL/FedEx for express sample shipments. Full export documentation is provided.',
        ar: 'نعم. نتولى الشحن FOB وCIF من ميناء الإسكندرية والقاهرة. نعمل مع شركات الشحن الرئيسية للشحن البحري، وDHL/FedEx لشحن العينات السريعة. نقدم جميع وثائق التصدير الكاملة.',
      },
    },
  ],
  oem: [
    {
      question: {
        en: 'What does your OEM process look like?',
        ar: 'كيف تبدو عملية التصنيع بالوكالة (OEM) لديكم؟',
      },
      answer: {
        en: 'Our OEM process has 4 stages: (1) Design & Specifications — share your designs, tech packs, or samples; (2) Quote & Timeline — we provide detailed pricing and production schedule; (3) Sample & Approval — we produce samples for your review and approval; (4) Production & Delivery — full production run with quality control and shipping.',
        ar: 'تتكون عملية التصنيع بالوكالة لدينا من 4 مراحل: (1) التصميم والمواصفات — شارك تصاميمك أو حزم المواصفات الفنية أو العينات؛ (2) عرض السعر والجدول الزمني — نقدم تسعيراً مفصلاً وجدولاً زمنياً للإنتاج؛ (3) العينات والموافقة — ننتج عينات للمراجعة والموافقة؛ (4) الإنتاج والتسليم — تشغيل إنتاجي كامل مع مراقبة الجودة والشحن.',
      },
    },
    {
      question: {
        en: 'Can you produce under our brand label?',
        ar: 'هل يمكنكم الإنتاج تحت علامتنا التجارية؟',
      },
      answer: {
        en: 'Yes. We offer complete private label services including custom hang tags, insole branding, box printing, and branded packaging. We can work with your existing designs or help develop new ones.',
        ar: 'نعم. نقدم خدمات العلامة التجارية الخاصة الكاملة بما في ذلك بطاقات التعليق المخصصة، والعلامة على الجلد الداخلي للحذاء، وطباعة الصناديق، والتعبئة المعتمدة. يمكننا العمل مع تصاميمك الحالية أو المساعدة في تطوير تصاميم جديدة.',
      },
    },
    {
      question: {
        en: 'What is the typical MOQ for OEM orders?',
        ar: 'ما هو الحد الأدنى المعتاد للطلب لطلبات التصنيع بالوكالة؟',
      },
      answer: {
        en: 'OEM orders typically require a minimum of 1,000 pairs per style. For new clients, we offer a reduced MOQ of 500 pairs for initial orders to build the partnership.',
        ar: 'تتطلب طلبات التصنيع بالوكالة عادةً الحد الأدنى البالغ 1,000 زوج لكل طراز. بالنسبة للعملاء الجدد، نقدم الحد الأدنى المخفض وهو 500 زوج للطلبات الأولى لبناء الشراكة.',
      },
    },
  ],
}

const categoryLabels: Record<FAQCategory, { en: string; ar: string }> = {
  general: { en: 'General', ar: 'عام' },
  products: { en: 'Products', ar: 'المنتجات' },
  manufacturing: { en: 'Manufacturing', ar: 'التصنيع' },
  shipping: { en: 'Shipping & Payment', ar: 'الشحن والدفع' },
  oem: { en: 'OEM & Private Label', ar: 'التصنيع بالوكالة والعلامة التجارية الخاصة' },
}

const categoryOrder: FAQCategory[] = ['general', 'products', 'manufacturing', 'shipping', 'oem']

export function FAQPage({ lang }: { lang: Locale }) {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
          description={isAr ? 'إجابات على الأسئلة الأكثر تكراراً حول منتجاتنا وخدماتنا' : 'Answers to the most commonly asked questions about our products and services'}
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
