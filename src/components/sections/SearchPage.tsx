'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'

const blogPosts = [
  {
    slug: 'future-of-egyptian-footwear-manufacturing',
    title: { en: 'The Future of Egyptian Footwear Manufacturing', ar: 'مستقبل صناعة الأحذية المصرية' },
    description: { en: 'Egypt is rapidly becoming a global hub for footwear production.', ar: 'أصبحت مصر بسرعة مركزاً عالمياً لإنتاج الأحذية.' },
    category: 'blog',
    href: '/blog/',
  },
  {
    slug: 'quality-control-in-modern-shoe-production',
    title: { en: 'Quality Control in Modern Shoe Production', ar: 'مراقبة الجودة في إنتاج الأحذية الحديثة' },
    description: { en: 'Multi-stage quality inspection process ensures international standards.', ar: 'عملية فحص الجودة متعددة المراحل تضمن المعايير الدولية.' },
    category: 'blog',
    href: '/blog/',
  },
  {
    slug: 'sustainable-materials-in-footwear',
    title: { en: 'Sustainable Materials in Footwear', ar: 'المواد المستدامة في صناعة الأحذية' },
    description: { en: 'How eco-friendly materials are reshaping the footwear industry.', ar: 'كيف تعيد المواد الصديقة للبيئة تشكيل صناعة الأحذية.' },
    category: 'blog',
    href: '/blog/',
  },
  {
    slug: 'oem-vs-private-label-whats-the-difference',
    title: { en: "OEM vs Private Label: What's the Difference?", ar: 'التصنيع بالعلامة التجارية مقابل العلامة الخاصة' },
    description: { en: 'Understanding OEM and private label manufacturing.', ar: 'فهم التصنيع بالعلامة التجارية والعلامة الخاصة.' },
    category: 'blog',
    href: '/blog/',
  },
  {
    slug: 'egypts-growing-role-in-global-footwear',
    title: { en: "Egypt's Growing Role in Global Footwear", ar: 'الدور المتزايد لمصر في صناعة الأحذية العالمية' },
    description: { en: 'How Egyptian manufacturers are gaining international recognition.', ar: 'كيف تحصل مصنعي الأحذية المصرية على اعتراف دولي.' },
    category: 'blog',
    href: '/blog/',
  },
  {
    slug: 'how-to-choose-the-right-shoe-manufacturer',
    title: { en: 'How to Choose the Right Shoe Manufacturer', ar: 'كيف تختار المصنّع المناسب' },
    description: { en: 'Key factors when selecting a manufacturing partner.', ar: 'العوامل الرئيسية عند اختيار شريك التصنيع.' },
    category: 'blog',
    href: '/blog/',
  },
]

const productCategories = [
  { slug: 'casual', title: { en: 'Casual Shoes', ar: 'أحذية كاجوية' }, description: { en: 'Comfortable everyday footwear', ar: 'أحذية مريحة للاستخدام اليومي' }, href: '/products?category=casual' },
  { slug: 'sport', title: { en: 'Sport Shoes', ar: 'أحذية رياضية' }, description: { en: 'Performance athletic footwear', ar: 'أحذية رياضية عالية الأداء' }, href: '/products?category=sport' },
  { slug: 'formal', title: { en: 'Formal Shoes', ar: 'أحذية رسمية' }, description: { en: 'Professional and elegant footwear', ar: 'أحذية مهنية وأنيقة' }, href: '/products?category=formal' },
  { slug: 'safety', title: { en: 'Safety Boots', ar: 'أحذية سلامة' }, description: { en: 'Industrial protection footwear', ar: 'أحذية حماية صناعية' }, href: '/products?category=safety' },
  { slug: 'sandal', title: { en: 'Sandals', ar: 'شباشب' }, description: { en: 'Open-toe casual footwear', ar: 'أحذية مفتوحة الكاجوية' }, href: '/products?category=sandal' },
  { slug: 'boot', title: { en: 'Boots', ar: 'بوت' }, description: { en: 'Durable outdoor footwear', ar: 'أحذية متينة للخارج' }, href: '/products?category=boot' },
]

const pages = [
  { title: { en: 'About Us', ar: 'عن الشركة' }, description: { en: 'Our story, mission, and values', ar: 'قصتنا ورسالتنا وقيمنا' }, href: '/about' },
  { title: { en: 'Manufacturing Process', ar: 'عملية التصنيع' }, description: { en: 'From raw materials to finished shoes', ar: 'من المواد الخام إلى الأحذية النهائية' }, href: '/manufacturing' },
  { title: { en: 'Factory Capabilities', ar: 'قدرات المصنع' }, description: { en: 'State-of-the-art facility', ar: 'منشأة متطورة' }, href: '/capabilities' },
  { title: { en: 'Quality Control', ar: 'مراقبة الجودة' }, description: { en: 'Our commitment to excellence', ar: 'التزامنا بالتميز' }, href: '/quality' },
  { title: { en: 'OEM & Private Label', ar: 'OEM والعلامة التجارية الخاصة' }, description: { en: 'Custom manufacturing services', ar: 'خدمات تصنيع مخصصة' }, href: '/oem' },
  { title: { en: 'Contact', ar: 'اتصل بنا' }, description: { en: 'Get in touch with our team', ar: 'تواصل مع فريقنا' }, href: '/contact' },
  { title: { en: 'Gallery', ar: 'المعرض' }, description: { en: 'Factory and product photos', ar: 'صور المصنع والمنتجات' }, href: '/gallery' },
  { title: { en: 'Blog', ar: 'المدونة' }, description: { en: 'Industry insights and news', ar: 'رؤى وأخبار الصناعة' }, href: '/blog' },
  { title: { en: 'Request Quote', ar: 'طلب عرض سعر' }, description: { en: 'Get a manufacturing proposal', ar: 'احصل على اقتراح تصنيع' }, href: '/quote' },
]

export function SearchPage({ lang, query }: { lang: Locale; query: string }) {
  const [searchQuery, setSearchQuery] = useState(query)
  const isAr = lang === 'ar'

  const results = useMemo(() => {
    if (!searchQuery.trim()) return []

    const q = searchQuery.toLowerCase()
    const matchedItems: Array<{ type: string; title: string; description: string; href: string }> = []

    blogPosts.forEach((post) => {
      const title = post.title[lang]
      const desc = post.description[lang]
      if (title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
        matchedItems.push({ type: 'blog', title, description: desc, href: `/${lang}/blog/${post.slug}` })
      }
    })

    productCategories.forEach((cat) => {
      const title = cat.title[lang]
      const desc = cat.description[lang]
      if (title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
        matchedItems.push({ type: 'product', title, description: desc, href: `/${lang}${cat.href}` })
      }
    })

    pages.forEach((page) => {
      const title = page.title[lang]
      const desc = page.description[lang]
      if (title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
        matchedItems.push({ type: 'page', title, description: desc, href: `/${lang}${page.href}` })
      }
    })

    return matchedItems
  }, [searchQuery, lang])

  const typeLabels: Record<string, { en: string; ar: string }> = {
    blog: { en: 'Blog Post', ar: 'مقال' },
    product: { en: 'Product', ar: 'منتج' },
    page: { en: 'Page', ar: 'صفحة' },
  }

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'بحث' : 'Search' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'بحث' : 'SEARCH'}
          title={isAr ? 'بحث' : 'Search'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-10">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث...' : 'Search...'}
              aria-label={isAr ? 'بحث' : 'Search'}
              autoFocus
              className="w-full rounded-xl bg-card border border-border pl-12 pr-4 py-4 heading-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
            />
          </div>

          {searchQuery.trim() && (
            <p className="body-sm text-text-muted mb-6">
              {results.length === 0
                ? isAr ? `لا توجد نتائج لـ "${searchQuery}"` : `No results for "${searchQuery}"`
                : isAr ? `${results.length} نتيجة لـ "${searchQuery}"` : `${results.length} result${results.length !== 1 ? 's' : ''} for "${searchQuery}"`
              }
            </p>
          )}

          {searchQuery.trim() && results.length === 0 && (
            <div className="text-center py-20">
              <svg className="mx-auto h-16 w-16 text-text-dim mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="heading-sm mb-2">
                {isAr ? 'لا توجد نتائج' : 'No results found'}
              </h2>
              <p className="body-md">
                {isAr ? 'جرب كلمات مفتاحية مختلفة أو تصفح صفحاتنا مباشرة.' : 'Try different keywords or browse our pages directly.'}
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              {results.map((result, i) => (
                <Link
                  key={`${result.href}-${i}`}
                  href={`/${lang}${result.href}`}
                  className="group card block"
                >
                  <span className="label-tag block mb-2">
                    {typeLabels[result.type][lang]}
                  </span>
                  <h3 className="heading-sm text-sm group-hover:text-accent transition-colors mb-1">
                    {result.title}
                  </h3>
                  <p className="body-sm line-clamp-2">
                    {result.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {!searchQuery.trim() && (
            <div className="text-center py-20">
              <svg className="mx-auto h-16 w-16 text-text-dim mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="heading-sm mb-2">
                {isAr ? 'ابحث في الموقع' : 'Search the website'}
              </h2>
              <p className="body-md">
                {isAr ? 'ابحث عن المنتجات والمقالات والصفحات.' : 'Search for products, articles, and pages.'}
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
