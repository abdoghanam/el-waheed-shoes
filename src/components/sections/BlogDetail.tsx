'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const blogPosts = [
  {
    slug: 'future-of-egyptian-footwear-manufacturing',
    title: { en: 'The Future of Egyptian Footwear Manufacturing', ar: 'مستقبل صناعة الأحذية المصرية' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-08-10',
  },
  {
    slug: 'quality-control-in-modern-shoe-production',
    title: { en: 'Quality Control in Modern Shoe Production', ar: 'مراقبة الجودة في إنتاج الأحذية الحديثة' },
    category: 'quality',
    categoryLabel: { en: 'Quality', ar: 'الجودة' },
    date: '2026-05-22',
  },
  {
    slug: 'sustainable-materials-in-footwear',
    title: { en: 'Sustainable Materials in Footwear', ar: 'المواد المستدامة في صناعة الأحذية' },
    category: 'sustainability',
    categoryLabel: { en: 'Sustainability', ar: 'الاستدامة' },
    date: '2026-03-14',
  },
  {
    slug: 'oem-vs-private-label-whats-the-difference',
    title: { en: "OEM vs Private Label: What's the Difference?", ar: 'التصنيع بالعلامة التجارية مقابل العلامة الخاصة' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2025-12-08',
  },
  {
    slug: 'egypts-growing-role-in-global-footwear',
    title: { en: "Egypt's Growing Role in Global Footwear", ar: 'الدور المتزايد لمصر في صناعة الأحذية العالمية' },
    category: 'news',
    categoryLabel: { en: 'Industry News', ar: 'أخبار الصناعة' },
    date: '2025-09-19',
  },
  {
    slug: 'how-to-choose-the-right-shoe-manufacturer',
    title: { en: 'How to Choose the Right Shoe Manufacturer', ar: 'كيف تختار المصنّع المناسب' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2025-06-30',
  },
]

const blogContent: Record<string, { en: string[]; ar: string[] }> = {
  'future-of-egyptian-footwear-manufacturing': {
    en: [
      'Egypt\'s footwear manufacturing industry has undergone a remarkable transformation over the past decade. With a combination of skilled labor, competitive costs, and strategic geographic positioning, Egyptian factories are now producing footwear for some of the world\'s most recognized brands.',
      'The adoption of modern manufacturing technologies has been a key driver of this growth. Computer-guided cutting systems, automated stitching machines, and advanced quality inspection tools have elevated the standards of production across the industry.',
      'Government support through industrial zones, tax incentives, and export promotion programs has further strengthened Egypt\'s position. The country now hosts over 200 footwear factories, contributing more than $1.2 billion annually to the national economy.',
      'Looking ahead, the Egyptian footwear sector is well-positioned to continue its growth trajectory. With ongoing investments in infrastructure, workforce training, and technology, the country is set to become an even more significant player in the global footwear market.',
    ],
    ar: [
      'شهدت صناعة تصنيع الأحذية في مصر تحولاً ملحوظاً على مدى العقد الماضي. مع الجمع بين العمالة الماهرة والتكاليف التنافسية والموقع الجغرافي الاستراتيجي، تقوم المصانع المصرية الآن بإنتاج الأحذية لبعض العلامات التجارية الأكثر شهرة في العالم.',
      'كان تبنّي تقنيات التصنيع الحديثة محركاً رئيسياً لهذا النمو. أنظمة القص الموجهة بالحاسوب والآلات الأوتوماتيكية وأدوات فحص الجودة المتقدمة رفعت معايير الإنتاج عبر الصناعة.',
      'كما تلعب الاستدامة دوراً متزايد الأهمية. تستثمر العديد من المصانع المصرية الآن في مواد وعمليات صديقة للبيئة، مراعية أن المشترين العالميين يعطون الأولوية للمصادر المسؤولة في قرارات سلسلة التوريد الخاصة بهم.',
      'نظر للمستقبل، تقع قطاع الأحذية المصرية في موقع جيد لمواصلة مسار نموها. مع الاستمرار في الاستثمارات في البنية التحتية وتدريب القوى العاملة والتقنية، تتجه مصر لأن تصبح لاعباً أكبر في سوق الأحذية العالمية.',
    ],
  },
  'quality-control-in-modern-shoe-production': {
    en: [
      'Quality control is the backbone of any reputable footwear manufacturer. At EL WAHEED SHOES, every pair passes through a rigorous multi-stage inspection process before it earns approval for shipment. From raw material testing to final packaging checks, no detail is overlooked.',
      'Our quality lab is equipped with industry-standard testing machinery including flex testers, abrasion resistance machines, and color fastness equipment. Each batch of materials is tested for tensile strength, sole adhesion, and dimensional accuracy to ensure compliance with international standards.',
      'We operate under ISO 9001:2015 quality management systems, and our defect rate consistently stays below 1.5% — well under the industry average. Every production line has dedicated quality inspectors who catch issues at the source rather than at the end of the process.',
      'Beyond compliance, our quality philosophy is about building trust. When international buyers receive products from EL WAHEED SHOES, they know they are getting footwear that meets or exceeds their specifications — every single time.',
    ],
    ar: [
      'مراقبة الجودة هي العمود الفقري لأي مصنع أحذية موثوق. في الوحيد للاحذية، كل زوج يمر بعملية فحص صارمة متعددة المراحل قبل أن يحصل على موافقة الشحن.',
      'مختبر الجودة لدينا مجهز بأجهزة اختبار مطابقة للمعايير الصناعية بما في ذلك أجهزة اختبار المرونة ومقاومة الاحتكاك ومعدات اختبار ثبات اللون.',
      'نعمل وفقاً لإدارة أنظمة الجودة ISO 9001:2015، ونسبة العيوب لدينا لا تتجاوز 1.5% باستمرار — وهو ما يقل بكثير عن المتوسط الصناعي.',
      'وأبعد من الامتثال، فلسفة الجودة لدينا تتمحور حول بناء الثقة. عندما يتلقى المشترون الدوليون منتجات من الوحيد للاحذية، يعرفون أنهم يحصلون على أحذية تلبي أو تتجاوز مواصفاتهم.',
    ],
  },
  'sustainable-materials-in-footwear': {
    en: [
      'Sustainability is no longer optional in the footwear industry — it is a business imperative. Global brands are demanding eco-friendly materials, and consumers are increasingly choosing manufacturers who demonstrate environmental responsibility.',
      'At EL WAHEED SHOES, we have invested heavily in sustainable material sourcing. Our recycled rubber compounds use up to 40% post-consumer waste, reducing our carbon footprint while maintaining the durability and performance our clients expect.',
      'We also work with leather suppliers who follow LWG (Leather Working Group) certified processes, ensuring responsible chemical management, water treatment, and waste disposal throughout the supply chain.',
      'Our facility has reduced water consumption by 30% through closed-loop systems and is transitioning to solar energy for 50% of production needs. These investments not only benefit the planet but also make us a more attractive partner for sustainability-conscious brands.',
    ],
    ar: [
      'الاستدامة لم تعد اختيارية في صناعة الأحذية — إنها متطلب أساسي للمنافسة. تبحث العلامات التجارية العالمية عن مواد صديقة للبيئة ويفضّلون المصنعين الذين يثبتون مسؤوليتهم البيئية.',
      'في الوحيد للاحذية، استثمرنا بشكل كبير في توريد المواد المستدامة. مركبات المطاط المعاد تدويرها لدينا تستخدم ما يصل إلى 40% من نفايات ما بعد الاستهلاك، مما يقلل بصمة الكربون مع الحفاظ على المتانة والأداء المتوقع.',
      'كما نعمل مع موردي جلود يتبعون عمليات معتمدة من مجموعة عمل الجلود LWG، مما يضمن إدارة مسؤولة للكيماويات ومعالجة المياه والصرف بشكل صحيح عبر سلسلة التوريد بالكامل.',
      'خفّضنا استهلاك الماء في مصنعنا بنسبة 30% من خلال أنظمة الدورة المغلقة، ونعمل حالياً على تحويل 50% من احتياجات الطاقة إلى الطاقة الشمسية.',
    ],
  },
  'oem-vs-private-label-whats-the-difference': {
    en: [
      'When entering the footwear market, brands face a crucial decision: OEM or private label manufacturing. Understanding the difference between these two approaches is essential for making the right choice for your business.',
      'OEM (Original Equipment Manufacturer) means the factory produces shoes based on your exact designs, specifications, and materials. You provide the blueprint — we bring it to life. This approach offers maximum customization but typically requires higher minimum order quantities.',
      'Private label manufacturing uses the factory\'s existing designs with your branding applied. This is a faster, more cost-effective entry point with lower MOQs, making it ideal for startups and businesses testing new markets.',
      'Both models have their strengths. OEM gives you total control over every detail, while private label lets you launch quickly with proven designs. At EL WAHEED SHOES, we support both approaches and can help you determine which is the best fit for your goals and budget.',
    ],
    ar: [
      'عند الدخول إلى سوق الأحذية، تواجه العلامات التجارية قراراً حاسماً: تصنيع OEM أو العلامة الخاصة.',
      'OEM (المصنّع الأصلي) يعني أن المصنع ينتج الأحذية بناءً على تصاميمك ومواصفاتك وموادك بالضبط.',
      'تصنيع العلامة الخاصة يستخدم التصميمات الحالية للمصنع مع تطبيق علامتك التجارية. هذه نقطة دخول أسرع وأكثر فعالية من حيث التكلفة.',
      'لكل من النموذجين نقاط قوتهما. OEM يمنحك تحكماً كاملاً في كل تفصيل، بينما العلامة الخاصة تتيح لك الإطلاق بسرعة بتصميمات مثبتة.',
    ],
  },
  'egypts-growing-role-in-global-footwear': {
    en: [
      'Egypt\'s relationship with footwear production stretches back centuries, but the modern era of industrial-scale manufacturing began in the early 2000s. Today, Egypt has established itself as a credible alternative to traditional Asian manufacturing hubs.',
      'With over 200 active footwear factories and a workforce of more than 50,000 skilled workers, Egypt produces approximately 80 million pairs annually. The industry contributes over $1.2 billion to the national economy and continues to grow at 8-10% per year.',
      'Egypt\'s competitive advantages are significant: proximity to European and Middle Eastern markets reduces shipping times and costs, trade agreements provide preferential tariff access, and a young, skilled workforce offers competitive labor costs without sacrificing quality.',
      'As global supply chains diversify away from over-reliance on single regions, Egypt is uniquely positioned to capture a larger share of the global footwear market. The country\'s strategic location, improving infrastructure, and growing reputation for quality make it an increasingly attractive destination for international brands.',
    ],
    ar: [
      'علاقة مصر بإنتاج الأحذية تمتد لقرون، لكن العصر الحديث للتصنيع على نطاق صناعي بدأ في أوائل العقد الأول من القرن الحادي والعشرين.',
      'مع أكثر من 200 مصنع نشط للأحذية وقوة عاملة تزيد عن 50,000 عامل ماهر، تنتج مصر ما يقارب 80 مليون زوج سنوياً.',
      'المزايا التنافسية لمصر كبيرة: القرب من أسواق أوروبا والشرق الأوسط يقلل أوقات الشحن والتكاليف.',
      'مع تنويع سلاسل التوريد العالمية، تقع مصر في موقع فريد للاستحواذ على حصة أكبر من سوق الأحذية العالمي.',
    ],
  },
  'how-to-choose-the-right-shoe-manufacturer': {
    en: [
      'Choosing the right manufacturing partner is one of the most important decisions a footwear brand can make. The right factory will elevate your product; the wrong one can damage your reputation and bottom line.',
      'Start by evaluating quality infrastructure. Look for manufacturers with ISO certifications, dedicated quality labs, and documented inspection procedures. Ask about their defect rates and request samples before committing to any production run.',
      'Capacity and reliability matter just as much as quality. Can the factory handle your volume requirements? Do they have a track record of on-time delivery? Visit the facility if possible, or at minimum, request video tours and references from existing clients.',
      'Communication and transparency are often overlooked but critical. The best manufacturers respond quickly, provide regular production updates, and are honest about challenges. At EL WAHEED SHOES, we believe a strong manufacturer-client relationship is built on open communication and mutual respect.',
    ],
    ar: [
      'اختيار الشريك التصنيعي المناسب هو أحد أهم القرارات التي يمكن لعلامة تجارية للأحذية اتخاذها.',
      'ابدأ بتقييم بنية الجودة. ابحث عن المصنعين الحاصلين على شهادات ISO ومختبرات جودة مخصصة وإجراءات فحص موثقة.',
      'الطاقة والموثوقية يهمان بقدر الجودة. هل يمكن للمصنع التعامل مع متطلبات حجمك؟ هل لديهم سجل تسليم في الوقت المحدد؟',
      'التواصل والشفافية غالبًا ما يتم تجاهلها لكنها حاسمة. أفضل المصنعين يستجيبون بسرعة ويقدمون تحديثات إنتاج منتظمة.',
    ],
  },
}

const defaultContent: { en: string[]; ar: string[] } = {
  en: [
    'This article explores key trends and insights in the footwear manufacturing industry. As global demand for quality footwear continues to grow, manufacturers are adapting to meet new challenges and opportunities.',
    'The modern footwear production process combines traditional craftsmanship with cutting-edge technology. From material selection to final quality inspection, every step is optimized for efficiency and precision.',
    'Quality control remains at the heart of premium footwear manufacturing. Multi-stage inspection processes ensure that every pair meets the rigorous standards expected by international buyers and end consumers alike.',
    'As the industry evolves, manufacturers who invest in innovation, sustainability, and skilled workforce development will continue to lead the market and deliver exceptional value to their partners worldwide.',
  ],
  ar: [
    'يستكشف هذا المقال أهم الاتجاهات والرؤى في صناعة تصنيع الأحذية. مع استمرار النمو العالمي في الطلب على الأحذية عالية الجودة، يتكيف المصنعون لتلبية التحديات والفرص الجديدة.',
    'تجمع عملية إنتاج الأحذية الحديثة بين الحرفية التقنية والتكنولوجيا المتطورة. من اختيار المواد إلى فحص الجودة النهائي، كل خطوة محسّنة للكفاءة والدقة.',
    'تظل مراقبة الجودة في صميم تصنيع الأحذية الفاخرة. تضمن عمليات الفحص متعددة المراحل مطابقة كل زوج للمعايير الصارمة التي يتوقعها المشترون الدوليون والمستهلكون على حد سواء.',
    'ومع تطور الصناعة، سيستمر المصنعون الذين يستثمرون في الابتكار والاستدامة وتطوير القوى العاملة الماهرة في قيادة السوق وتقديم قيمة استثنائية لشركائهم حول العالم.',
  ],
}

function getReadingTime(content: string[]): number {
  const words = content.join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function BlogDetail({
  lang,
  slug,
}: {
  lang: Locale
  slug: string
}) {
  const [copied, setCopied] = useState(false)
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const post = blogPosts.find((p) => p.slug === slug)
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  const title = post?.title[lang] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const category = post?.category ?? 'manufacturing'
  const categoryLabel = post?.categoryLabel[lang] ?? 'Manufacturing'
  const date = post?.date ?? '2026-08-10'

  const content = blogContent[slug]?.[lang] ?? defaultContent[lang]
  const readingTime = getReadingTime(content)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = title

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr)
    return dateObj.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Section>
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ label: lang === 'ar' ? 'المدونة' : 'Blog', href: `/${lang}/blog` }, { label: title }]} lang={lang} />
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 body-sm text-text-muted hover:text-accent transition-colors mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isAr ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>

          <span className="label-tag block mb-4">{categoryLabel}</span>
          <h1 className="heading-lg mb-4">{title}</h1>

          <div className="flex items-center gap-4 body-sm text-text-muted mb-8">
            <span>{isAr ? 'فريق الوحيد للاحذية' : 'EL WAHEED SHOES Team'}</span>
            <span className="w-1 h-1 rounded-full bg-text-dim" />
            <span>{formatDate(date)}</span>
            <span className="w-1 h-1 rounded-full bg-text-dim" />
            <span>{readingTime} {isAr ? 'دقائق قراءة' : 'min read'}</span>
          </div>

          <div className="flex items-center gap-3 mb-10">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent transition-colors body-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent transition-colors body-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent transition-colors body-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-text-muted hover:border-accent hover:text-accent transition-colors body-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy Link')}
            </button>
          </div>

          <div className="space-y-6 mb-12">
            {content.map((paragraph, i) => (
              <p key={i} className="body-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="heading-sm mb-1">
                  {isAr ? 'فريق الوحيد للاحذية' : 'EL WAHEED SHOES Team'}
                </h4>
                <p className="body-sm">
                  {isAr
                    ? 'فريق المحتوى في الوحيد للاحذية — متخصصون في صناعة الأحذية والتصنيع.'
                    : 'The content team at EL WAHEED SHOES specializing in footwear manufacturing and industry insights.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section dark={false}>
        <div className="card p-8 text-center max-w-2xl mx-auto mb-12">
          <h3 className="heading-sm mb-2">
            {isAr ? 'استمتع بهذا المقال؟' : 'Enjoyed this article?'}
          </h3>
          <p className="body-md mb-6">
            {isAr ? 'اشترك للحصول على المزيد من المقالات والرؤى.' : 'Subscribe for more articles and insights.'}
          </p>
          <div className="flex w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email address'}
              className="flex-1 rounded-l-xl bg-card border border-border border-r-0 px-4 py-3 body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold"
            />
            <button className="btn-primary rounded-l-none">
              {isAr ? 'اشترك' : 'Subscribe'}
            </button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          label={isAr ? 'مقالات ذات صلة' : 'RELATED ARTICLES'}
          title={isAr ? 'مقالات ذات صلة' : 'Related Articles'}
          align="center"
        />
        <SectionGrid cols={3}>
          {related.map((rel) => (
            <Link
              key={rel.slug}
              href={`/${lang}/blog/${rel.slug}`}
              className="group card overflow-hidden"
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <svg viewBox="0 0 400 160" className="w-full h-full" fill="none">
                  <rect width="400" height="160" fill="#111" />
                  <rect x="15" y="15" width="370" height="130" rx="6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.15" />
                </svg>
              </div>
              <span className="label-tag block mb-2">
                {rel.categoryLabel[lang]}
              </span>
              <h3 className="heading-sm text-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {rel.title[lang]}
              </h3>
              <span className="body-sm text-text-dim">{formatDate(rel.date)}</span>
            </Link>
          ))}
        </SectionGrid>
      </Section>
    </>
  )
}
