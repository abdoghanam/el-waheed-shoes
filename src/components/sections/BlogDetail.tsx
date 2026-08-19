'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { siteImages } from '@/lib/images'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const blogPosts = [
  {
    slug: 'egyptian-footwear-export-growth-2026',
    title: { en: "Egypt's Footwear Export Market Grows 18% in 2026", ar: 'تصدير الأحذية المصري يسجل نمو 18% في 2026' },
    category: 'news',
    categoryLabel: { en: 'Industry News', ar: 'أخبار الصناعة' },
    date: '2026-08-10',
  },
  {
    slug: 'quality-control-leather-footwear-production',
    title: { en: '7-Stage Quality Control in Leather Footwear Production', ar: 'مراقبة الجودة في 7 مراحل لإنتاج أحذية الجلد' },
    category: 'quality',
    categoryLabel: { en: 'Quality', ar: 'الجودة' },
    date: '2026-07-28',
  },
  {
    slug: 'sustainable-footwear-manufacturing-egypt',
    title: { en: 'Sustainable Practices in Egyptian Footwear Factories', ar: 'الممارسات المستدامة في مصانع الأحذية المصرية' },
    category: 'sustainability',
    categoryLabel: { en: 'Sustainability', ar: 'الاستدامة' },
    date: '2026-07-15',
  },
  {
    slug: 'oem-private-label-shoe-manufacturing-guide',
    title: { en: 'Complete Guide to OEM & Private Label Shoe Manufacturing', ar: 'دليل شامل لتصنيع الأحذية بالعلامة التجارية الخاصة' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-07-01',
  },
  {
    slug: 'leather-sourcing-guide-footwear-industry',
    title: { en: 'Global Leather Sourcing: A Guide for Footwear Brands', ar: 'الشراء العالمي للجلد: دليل لعلامات الأحذية' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-06-18',
  },
  {
    slug: 'moq-flexibility-small-batch-footwear',
    title: { en: 'MOQ Flexibility: How Small Brands Can Access Factory Production', ar: 'مرونة الحد الأدنى للطلب: كيف تستطيع العلامات الصغيرة الوصول للإنتاج المصانع' },
    category: 'news',
    categoryLabel: { en: 'Industry News', ar: 'أخبار الصناعة' },
    date: '2026-06-05',
  },
]

const blogContent: Record<string, { en: string[]; ar: string[] }> = {
  'egyptian-footwear-export-growth-2026': {
    en: [
      "Egypt's footwear export sector has recorded an impressive 18% growth in the first half of 2026, reaching an estimated $1.45 billion in export value — a new record for the industry. According to the Egyptian Exporters Association, footwear shipments to the European Union alone grew by 22% year-over-year, driven by increased demand from Germany, Italy, and the Netherlands for mid-range leather shoes and sandals.",
      "Several factors are fueling this surge. Egypt's geographic proximity to Europe cuts shipping times to 5–7 days compared to 25–35 days from Southeast Asian competitors, a critical advantage in an era of just-in-time inventory. Combined with the EU-Egypt Association Agreement providing preferential tariff rates as low as 2.5% on qualifying footwear, Egyptian manufacturers are now price-competitive with Turkish producers while maintaining shorter lead times.",
      "The competitive landscape has shifted significantly. While Vietnam and China still dominate global footwear volumes, Egypt has carved a strong niche in the leather dress shoe and premium sandal categories. Industry data shows Egyptian factories now produce over 90 million pairs annually across 230+ active facilities, with the 10th of Ramadan City and 6th of October City industrial zones accounting for roughly 60% of total output.",
      "Looking at the second half of 2026, export projections remain bullish. The Egyptian Trade Authority has reported a 35% increase in new buyer inquiries from European and Gulf-region importers. Factories like EL WAHEED SHOES are expanding production lines specifically to meet growing orders for private label leather footwear, positioning Egypt to capture an even larger share of the $85 billion global footwear market.",
    ],
    ar: [
      'سجل قطاع تصدير الأحذية المصري نمواً ملحوظاً بنسبة 18% في النصف الأول من عام 2026، حيث وصلت قيمة التصدير إلى ما يقارب 1.45 مليار دولار أمريكي — وهو رقم قياسي جديد للصناعة. وفقاً لجمعية المصدرين المصريين، نمت شحنات الأحذية إلى الاتحاد الأوروبي بمعدل 22% مقارنة بالعام الماضي، مدفوعة بالطلب المتزايد من ألمانيا وإيطاليا وهولندا على أحذية الجلد والصنادل متوسطة السعر.',
      'عدة عوامل تقف وراء هذا الانفجار. تقل المسافة الجغرافية لمصر عن أوروبا أوقات الشحن إلى 5-7 أيام مقارنة بـ 25-35 يوماً من المنافسين في جنوب شرق آسيا، وهي ميزة حاسمة في عصر المخزون في الوقت المناسب. بالاقتران مع اتفاقية الشراكة الأوروبية-المصرية التي توفر معدلات تعريفة تفضيلية تصل إلى 2.5% على الأحذية المؤهلة، أصبح المصنعون المصريون تنافسيين من حيث السعر مع المنتجين الأتراك مع الحفاظ على أوقات تسليم أقصر.',
      'شهد المشهد التنافسي تحولاً كبيراً. بينما لا تزال فيتنام والصين تهيمن على أحجام الأحذية العالمية، استحوذت مصر على حصة قوية في فئات أحذية الجلد الرسمية والصنادل الفاخرة. تُظهر بيانات الصناعة أن المصانع المصرية تنتج الآن أكثر من 90 مليون زوج سنوياً عبر أكثر من 230 منشأة نشطة، حيث تُشكّل مدن العاشر من رمضان والسادس من أكتوبر الصناعية ما يقارب 60% من الإنتاج الكلي.',
      'بالنظر إلى النصف الثاني من عام 2026، تظل التوقعات التصديرية إيجابية. أبلغت هيئة التجارة المصرية عن زيادة بنسبة 35% في استفسارات المشترين الجدد من المستوردين الأوروبيين ومنطقة الخليج. توسع المصانع مثل الوحيد للاحذية خطوط الإنتاج تحديداً لتلبية الطلبات المتزايدة على الأحذية ذات العلامة التجارية الخاصة، مما يضع مصر في موقع متميز للاستحواذ على حصة أكبر من سوق الأحذية العالمي البالغ 85 مليار دولار.',
    ],
  },
  'quality-control-leather-footwear-production': {
    en: [
      'Quality control in leather footwear production is a systematic, multi-stage process that begins long before a single stitch is sewn. At EL WAHEED SHOES, we operate a rigorous 7-stage inspection framework that ensures every pair leaving our facility meets international standards and exceeds buyer expectations. This article breaks down each stage in detail.',
      'Stage 1 — Raw Material Inspection: Every incoming leather hide is graded for thickness (measured in ounces per square foot), grain consistency, and surface defects using a standardized A–D grading scale. We reject approximately 8–12% of incoming hides on average. Stage 2 — Component Testing: Hardware (buckles, zippers, eyelets), adhesives, and lining fabrics undergo tensile strength testing, salt spray corrosion testing (for metal components), and abrasion resistance checks per SATRA TM51 standards.',
      'Stage 3 — In-Process Cutting Inspection: Die-cut patterns are measured against CAD specifications with a tolerance of ±1.5mm. Skiving thickness is verified using digital micrometers at 10-piece intervals. Stage 4 — Assembly Line Checks: Stitch density is monitored at 6–8 stitches per centimeter for leather uppers. Goodyear welt stitching is tested for pull strength at 35N minimum. Adhesive bond strength between sole and upper is tested per SATRA TM411.',
      'Stage 5 — Pre-Finishing Audit: A random sample of 5% from each production batch undergoes flex testing (100,000 cycles minimum), color fastness to rubbing (Grade 4+ on the grey scale), and water resistance testing. Stage 6 — Final Product Inspection: Full dimensional checks, visual inspection under standardized lighting, and fit testing on last forms. Stage 7 — Packaging & Shipment Audit: Carton strength, labeling accuracy, and a final AQL 2.5 inspection before container loading. Our overall defect rate stays below 1.2%.',
    ],
    ar: [
      'مراقبة الجودة في إنتاج أحذية الجلد عملية منهجية متعددة المراحل تبدأ قبل خياطة غرزة واحدة. في مصنع الوحيد للاحذية، نقوم بتطبيق إطار فحص صارم من 7 مراحل يضمن أن كل زوج يغادر منشأتنا يلبي المعايير الدولية ويتجاوز توقعات المشتري. يتناول هذا المقال كل مرحلة بالتفصيل.',
      'المرحلة الأولى — فحص المواد الأولية: يتم تصنيف كل جلد وارد حسب السماكة (المقاسة بالأونصات لكل قدم مربعة) وتناسق حبيبات السطح والعيوب السطحية باستخدام مقياس موحد من A إلى D. نرفض في المتوسط ما يقارب 8-12% من الجلود الواردة. المرحلة الثانية — اختبار المكونات: تمر قطع الأجهزة (المقابض، السحابات، العيون) والصاقات وأقمشة البطانة باختبارات مقاومة الشد واختبار الرشاش المالح (للمكونات المعدنية) وفحوصات مقاومة الاحتكاك وفقاً لمعايير SATRA TM51.',
      'المرحلة الثالثة — فحص القص أثناء المعالجة: تُقاس أنماط القص المقطوعة بالقالب مقابل مواصفات CAD بهامش تحمّل ±1.5 مم. يتم التحقق من سماكة التفتيش باستخدام مجهر رقمي كل 10 قطع. المرحلة الرابعة — فحوصات خط التجميع: يتم مراقبة كثافة الخياطة عند 6-8 غزات لكل سنتيمتر للأغطية الجلدية. يُختبر خياط Goodyear welt لقوة السحب عند 35 نيوتون كحد أدنى. تُختبر قوة الالتصاق بين النعل والعلياً وفقاً لمعيار SATRA TM411.',
      'المرحلة الخامسة — التدقيق قبل التشطيب: يتم اختبار عينة عشوائية بنسبة 5% من كل دفعة إنتاجية اختبار المرونة (100,000 دورة كحد أدنى) ومقاومة اللون للفرك (الدرجة 4+ على مقياس الرمادي) ومقاومة الماء. المرحلة السادسة — الفحص النهائي للمنتج: فحوصات الأبعاد الكاملة والفحص البصري تحت إضاءة موحدة واختبار الملائمة على أشكال الأعمدة. المرحلة السابعة — تدقيق التعبئة والشحن: قوة الكراتين ودقة الملصق وفحص AQL 2.5 نهائي قبل تحميل الحاوية. نسبة العيوب الإجمالية لدينا تبقى أقل من 1.2%.',
    ],
  },
  'sustainable-footwear-manufacturing-egypt': {
    en: [
      'Sustainability in Egyptian footwear manufacturing has evolved from a marketing buzzword to a measurable business practice. At EL WAHEED SHOES, our sustainability program spans energy, water, materials, and waste management — with documented results that help our brand partners meet their ESG commitments.',
      'Energy & Solar: In 2025, we completed installation of a 450kW rooftop solar photovoltaic system covering 3,200 square meters of factory roof space. This system generates approximately 680,000 kWh annually, offsetting roughly 30% of our total electricity consumption and eliminating an estimated 410 tonnes of CO₂ emissions per year. The payback period was 4.2 years at current energy prices, making it one of the most cost-effective investments in our facility\'s history.',
      'Water Recycling & Treatment: Our closed-loop water recycling system, installed in early 2026, recovers and treats 85% of process water used in leather wet-end operations. This reduced our freshwater intake by 1.2 million liters per month — a 35% reduction. All wastewater is treated in our on-site biological treatment plant before discharge, ensuring compliance with Egypt\'s Law 48/1982 on water pollution control. We also use water-based, solvent-free adhesives across 90% of our production lines.',
      'Eco-Materials & Waste Diversion: We source LWG-certified (Leather Working Group) gold-rated hides from tanneries in Turkey and Italy that follow strict chemical management protocols. Our recycled rubber compound — used in casual and athletic sole production — incorporates 40% post-consumer recycled content. In 2026, we diverted 28 tonnes of leather offcuts from landfill through partnerships with local recyclers who process them into bonded leather boards. Our overall landfill diversion rate now exceeds 72%.',
    ],
    ar: [
      'تطورت الاستدامة في تصنيع الأحذية المصرية من شعار تسويقي إلى ممارسة قابلة للقياس. في مصنع الوحيد للاحذية، يمتد برنامج الاستدامة لدينا ليشمل الطاقة والماء والمواد وإدارة النفايات — مع نتائج موثقة تساعد شركائنا من العلامات التجارية على تلبية التزاماتهم البيئية والاجتماعية والحوكمة.',
      'الطاقة والطاقة الشمسية: في عام 2025، أكملنا تركيب نظام الطاقة الشمسية الكهروضوئية بقدرة 450 كيلوواط يغطي 3,200 متر مربع من مساحة سقف المصنع. يولد هذا النظام ما يقارب 680,000 كيلوواط ساعة سنوياً، مما يعوض ما يقارب 30% من استهلاكنا الكهربائي الإجمالي ويلغي ما يقدر بـ 410 طن من انبعاثات ثاني أكسيد الكربون سنوياً. كانت فترة استرداد الاستثمار 4.2 سنة بأسعار الطاقة الحالية.',
      'إعادة تدوير المياه ومعالجتها: نظام إعادة تدوير المياه الدور المغلق لدينا، الذي تم تركيبه في أوائل عام 2026، يسترد ويعالج 85% من مياه العمليات المستخدمة في عمليات الجلد النهائية. هذا قلّل من استهلاكنا للمياه العذبة بمقدار 1.2 مليون لتر شهرياً — وهو انخفاض بنسبة 35%. تُعالج جميع مياه الصرف في مصنع المعالجة البيولوجي الميداني لدينا قبل التصريف.',
      'المواد البيئية وتحويل النفايات: نحصل على جلود معتمدة من مجموعة عمل الجلود (LWG) بتصنيف ذهب من مصانع دباغة في تركيا وإيطاليا تتبع بروتوكولات صارمة لإدارة الكيماويات. مركب المطاط المعاد تدويره — المستخدم في إنتاج نعال الأحذية الكاجوية والرياضية — يتضمن 40% من محتوى ما بعد الاستهلاك المعاد تدويره. في عام 2026، حولنا 28 طناً من قصاصات الجلد من المدافن من خلال شراكات مع مُدوِّرين محليين.',
    ],
  },
  'oem-private-label-shoe-manufacturing-guide': {
    en: [
      'Partnering with an OEM footwear manufacturer is a significant step for any brand, and understanding the process from concept to delivery is essential for a successful outcome. This guide covers the key milestones, timelines, and requirements involved in working with a factory like EL WAHEED SHOES.',
      'Step 1 — Initial Consultation & NDA: We begin with a confidential consultation to understand your target market, price points, volume expectations, and design direction. A Non-Disclosure Agreement is executed before any proprietary designs or specifications are shared. Typical lead time for this phase: 3–5 business days.',
      'Step 2 — Sampling: Based on your tech packs or design briefs, our sample room produces 3 rounds of development samples. Round 1 (proto sample) takes 15–20 days. Round 2 (fit & construction sample) takes 10–15 days after feedback. Round 3 (pre-production final sample) takes 7–10 days. MOQ for sampling is typically 1–3 pairs per style. Sample costs range from $80–$150 per pair depending on complexity.',
      'Step 3 — Production: Once samples are approved, we issue a Proforma Invoice. Standard MOQ is 300–500 pairs per style per colorway for leather footwear, though we offer flexibility for initial orders. Production lead time is 45–60 days from deposit receipt. Quality checks occur at 5 critical control points during production. Step 4 — Certification & Shipping: We handle CE marking for EU markets, provide material test certificates (REACH compliance), and manage logistics from factory door to your port of destination. Full container load (FCL) or less-than-container load (LCL) options available.',
    ],
    ar: [
      'الشراكة مع مصنّع أحذية OEM خطوة كبيرة لأي علامة تجارية، وفهم العملية من المفهوم إلى التسليم ضروري لنجاح النتيجة. يغطي هذا الدليل المراحل الرئيسية والجداول الزمنية والمتطلبات المتعلقة بالعمل مع مصنع مثل الوحيد للاحذية.',
      'الخطوة الأولى — الاستشارة الأولية والاتفاقية السرية: نبدأ باستشارة سرية لفهم سوقك المستهدف والنقاط السعرية وتوقعات الحجم واتجاه التصميم. يتم تنفيذ اتفاقية عدم الإفصاح قبل مشاركة أي تصاميم أو مواصفات خاصة. الجدول الزمني النمطي لهذه المرحلة: 3-5 أيام عمل.',
      'الخطوة الثانية — أخذ العينات: بناءً على الحزم التقنية أو موجز التصميم، تُنتج غرفة العينات لدينا 3 جولات من عينات التطوير. الجولة الأولى (العينة الأولية) تستغرق 15-20 يوماً. الجولة الثانية (عينة الملائمة والبناء) تستغرق 10-15 أيام بعد التغذية الراجعة. الجولة الثالثة (العينة النهائية ما قبل الإنتاج) تستغرق 7-10 أيام. الحد الأدنى للطلب لأخذ العينات هو عادةً 1-3 أزواج لكل نمط. تكلفات العينات تتراوح بين 80-150 دولاراً لكل زوج حسب التعقيد.',
      'الخطوة الثالثة — الإنتاج: بمجرد الموافقة على العينات، نُصدر فاتورة مبدئية. الحد الأدنى للطلب النمطي هو 300-500 زوج لكل نمط ولكل لون للجلد، رغم أننا نقدم مرونة للطلبات الأولية. وقت التسليم الإنتاجي هو 45-60 يوماً من استلام الدفعة المقدمة. تحدث فحوصات الجودة في 5 نقاط تحكم حرجة أثناء الإنتاج. الخطوة الرابعة — التأهيل والشحن: نتولى تصريب CE لأسواق الاتحاد الأوروبي ونقدم شهادات اختبار المواد (امتثال REACH) وندير اللوجستيات من باب المصنع إلى ميناء الوصول.',
    ],
  },
  'leather-sourcing-guide-footwear-industry': {
    en: [
      'Leather is the single most important material in premium footwear manufacturing, and sourcing it wisely can make or break your product quality and margins. This guide breaks down the major sourcing origins, grades, tanning processes, and pricing benchmarks that footwear brands should understand.',
      'Italian Leather (Tuscany & Veneto regions): Italy remains the gold standard for chrome-tanned full-grain leather. Prices range from $8–$18 per square foot depending on finish, thickness, and supplier. Italian tanneries hold the highest concentration of LWG Gold and Silver ratings. Lead times for custom colors are typically 6–8 weeks. Best suited for: luxury dress shoes, premium loafer lines, and high-end sandals.',
      'Turkish Leather (Istanbul & Izmir regions): Turkey offers a strong price-to-quality ratio, with chrome-tanned leather at $4–$10 per square foot. Turkish tanneries have invested heavily in environmental compliance, and many hold LWG Silver or Bronze ratings. Lead times are faster at 3–5 weeks for standard colors. Turkey also offers excellent suede and nubuck options. Best suited for: mid-range leather shoes, fashion sandals, and boots.',
      'Indian & Ethiopian Leather: India produces over 2 billion square feet of leather annually, with prices ranging from $2–$6 per square foot for cowhide. Ethiopian leather (particularly from the Oromia region) has gained recognition for competitive pricing at $2.50–$5 per square foot with good grain quality. Both origins require more careful QC oversight for consistency. Best suited for: value-oriented footwear lines, casual shoes, and private label production where cost efficiency is the priority.',
    ],
    ar: [
      'الجلد هو أهم مادة في تصنيع الأحذية الفاخرة، وشراءه بحكمة قد يحدد جودة المنتج وهامش الربح. يشرح هذا الدليل أصول التوريد الرئيسية والدرجات وعمليات الدباغة ومعايير الأسعار التي يجب على علامات الأحذية فهمها.',
      'الجلد الإيطالي (مناطق توسكانا وفينيتو): تظل إيطاليا المعيار الذهبي للجلد الكامل المدبوغ بالكروم. تتراوح الأسعار من 8-18 دولاراً لكل قدم مربعة حسب التشطيب والسماكة والمورد. تحمل مصانع الدباغة الإيطالية أعلى تركيز لتصنيفات LWG الذهبية والفضية. أوقات التسليم للألوان المخصصة عادةً 6-8 أسابيع. الأنسب لأحذية العصر الفاخرة وخطوط اللوفر الفاخرة والصنادل رفيعة المستوى.',
      'الجلد التركي (مناطق إسطنبول وازمير): تقدم تركيا نسبة ممتازة من السعر إلى الجودة، حيث يتوفر الجلد المدبوغ بالكروم بأسعار 4-10 دولارات لكل قدم مربعة. استثمرت مصانع الدباغة التركية بكثافة في الامتثال البيئي وتحمل كثير منها تصنيفات LWG الفضية أو البرونزية. أوقات التسليم أسرع عند 3-5 أسابيع للألوان العادية. توفر تركيا أيضاً خيارات ممتازة للسويード والنوبوك.',
      'جلد الهند وأثيوبيا: تنتج الهند أكثر من 2 مليار قدم مربعة من الجلد سنوياً، بأسعار تتراوح من 2-6 دولارات لكل قدم مربعة لجلد البقر. اكتسب الجلد الإثيوبي (خاصة من منطقة أوروميا) شهرة بتنافسية الأسعار عند 2.50-5 دولارات لكل قدم مربعة مع جودة حبيبات جيدة. كلا الأصلين يتطلبان إشرافاً أكثر دقة في مراقبة الجودة للاتساق.',
    ],
  },
  'moq-flexibility-small-batch-footwear': {
    en: [
      'Minimum Order Quantities (MOQs) have traditionally been one of the biggest barriers for emerging footwear brands entering the market. At EL WAHEED SHOES, we believe that MOQ flexibility is essential for supporting the next generation of footwear entrepreneurs. Here\'s how we structure our flexible ordering policies.',
      'Sample Orders (No MOQ): Before any commitment, brands can order 1–3 pairs per style as development samples. This allows you to evaluate construction quality, material feel, and fit before committing to production. Sample fees are charged at cost with no markup, and are credited toward your first production order.',
      'Small Batch Production (50–150 pairs): For emerging brands, startups, and limited-edition launches, we offer a small batch program starting at just 50 pairs per style per colorway. Small batch pricing carries a 15–20% premium over standard production rates, reflecting the additional setup time, material waste from non-optimized cutting layouts, and per-unit quality control overhead. Despite the higher unit cost, this program eliminates the risk of overstocking and allows brands to test market response before scaling.',
      'Standard Production (300–500 pairs) & Volume Production (1,000+ pairs): Standard MOQs unlock full production efficiency with optimized cutting layouts, bulk material pricing, and streamlined quality control. At 1,000+ pairs, we offer additional volume discounts of 8–12% and dedicated production line allocation. Many of our clients start with small batch orders of 100–200 pairs, validate demand within 2–3 months, then scale to 500+ pairs per reorder. We provide a clear pricing ladder at each tier so you can plan your growth with cost certainty.',
    ],
    ar: [
      'كان الحد الأدنى للطلب (MOQs) تقليدياً أحد أبرز العوائق أمام العلامات التجارية الناشئة في سوق الأحذية. في مصنع الوحيد للاحذية، نؤمن بأن مرونة الحد الأدنى للطلب ضرورية لدعم الجيل القادم من رواد الأعمال في صناعة الأحذية. هكذا نقوم بهيكلة سياسات الطلب المرنة لدينا.',
      'طلبات العينات (بدون حد أدنى): قبل أي التزام، يمكن للعلامات التجارية طلب 1-3 أزواج لكل نمط كعينات تطوير. هذا يتيح لك تقييم جودة البناء والمادة والملائمة قبل الالتزام بالإنتاج. تُحسب تكاليف العينات دون ربح وتُحتسب كدفعة أولى في طلب الإنتاج الأول.',
      'الإنتاج بالدفعات الصغيرة (50-150 زوجاً): للعلامات الناشئة والشركات الناشئة والإطلاقات المحدودة الإصدار، نقدم برنامج الدفعات الصغيرة يبدأ من 50 زوجاً فقط لكل نمط ولكل لون. سعر الدفعات الصغيرة يحمل علاوة 15-20% مقارنة بأسعار الإنتاج العادية، مما يعكس وقت الإعداد الإضافي ونفايات المواد من تخطيط القص غير المحسّن وتكلفة مراقبة الجودة لكل وحدة.',
      'الإنتاج العادي (300-500 زوجاً) والإنتاج بكميات كبيرة (1000+ زوجاً): تفتح الحدود الدنيا العادية كفاءة الإنتاج الكاملة مع تخطيط قص محسّن وأسعار مواد جماعية ومراقبة جودة مبسطة. عند 1000+ زوج، نقدم خصومات إضافية بنسبة 8-12% وتخصيص خط إنتاج مخصص. يبدأ كثير من عملائنا بطلبات الدفعات الصغيرة بحجم 100-200 زوج ويتحققون من الطلب خلال 2-3 أشهر ثم يكملون إلى 500+ زوج.',
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
                <div className="relative w-full h-full">
                  <Image src={siteImages.blog.quality} alt="" fill className="object-cover" />
                </div>
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
