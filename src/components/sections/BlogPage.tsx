'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { siteImages } from '@/lib/images'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const POSTS_PER_PAGE = 4

const blogPosts = [
  {
    slug: 'egyptian-footwear-export-growth-2026',
    title: { en: "Egypt's Footwear Export Market Grows 18% in 2026", ar: ' تصدير الأحذية المصري يسجل نمو 18% في 2026' },
    excerpt: { en: "Egypt's footwear manufacturing sector continues its upward trajectory, with export volumes reaching record highs. Here's what's driving the growth.", ar: 'يستمر قطاع تصنيع الأحذية في مصر في مساره الصاعد، حيث وصلت أحجام التصدير إلى مستويات قياسية. إليك ما يقود هذا النمو.' },
    category: 'news',
    categoryLabel: { en: 'Industry News', ar: 'أخبار الصناعة' },
    date: '2026-08-10',
    author: 'EL WAHEED SHOES Team',
    featured: true,
  },
  {
    slug: 'quality-control-leather-footwear-production',
    title: { en: '7-Stage Quality Control in Leather Footwear Production', ar: 'مراقبة الجودة في 7 مراحل لإنتاج أحذية الجلد' },
    excerpt: { en: 'A deep dive into our multi-stage quality inspection process, from raw material testing to final product assessment.', ar: 'نظرة معمقة على عملية فحص الجودة متعددة المراحل لدينا، من اختبار الخامات الأولية إلى التقييم النهائي للمنتج.' },
    category: 'quality',
    categoryLabel: { en: 'Quality', ar: 'الجودة' },
    date: '2026-07-28',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'sustainable-footwear-manufacturing-egypt',
    title: { en: 'Sustainable Practices in Egyptian Footwear Factories', ar: 'الممارسات المستدامة في مصانع الأحذية المصرية' },
    excerpt: { en: 'How Egyptian manufacturers are adopting eco-friendly materials, waste reduction programs, and energy-efficient processes.', ar: 'كيف تتبنى المصنعين المصريين المواد الصديقة للبيئة وبرامج تقليل الهدر والعمليات الموفرة للطاقة.' },
    category: 'sustainability',
    categoryLabel: { en: 'Sustainability', ar: 'الاستدامة' },
    date: '2026-07-15',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'oem-private-label-shoe-manufacturing-guide',
    title: { en: 'Complete Guide to OEM & Private Label Shoe Manufacturing', ar: 'دليل شامل لتصنيع الأحذية بالعلامة التجارية الخاصة' },
    excerpt: { en: 'Everything brands need to know about partnering with an OEM footwear manufacturer, from design to delivery.', ar: 'كل ما تحتاج معرفته عن الشراكة مع مصنعي الأحذية، من التصميم إلى التسليم.' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-07-01',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'leather-sourcing-guide-footwear-industry',
    title: { en: 'Global Leather Sourcing: A Guide for Footwear Brands', ar: 'الشراء العالمي للجلد: دليل لعلامات الأحذية' },
    excerpt: { en: 'Understanding different leather grades, tanning processes, and how to source quality materials for your footwear line.', ar: 'فهم درجات الجلد المختلفة وعمليات الدباغة وكيفية توريد مواد عالية الجودة لخط الأحذية الخاص بك.' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-06-18',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'moq-flexibility-small-batch-footwear',
    title: { en: 'MOQ Flexibility: How Small Brands Can Access Factory Production', ar: 'مرونة الحد الأدنى للطلب: كيف تستطيع العلامات الصغيرة الوصول للإنتاج المصانع' },
    excerpt: { en: "Minimum order quantities don't have to be a barrier. Learn how flexible MOQ policies help emerging brands get started.", ar: 'الحد الأدنى للطلب لا يجب أن يكون عائقاً. تعرّف على كيفية سياسات المرونة التي تساعد العلامات الناشئة على البدء.' },
    category: 'news',
    categoryLabel: { en: 'Industry News', ar: 'أخبار الصناعة' },
    date: '2026-06-05',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
]

const categories = [
  { key: 'all', en: 'All', ar: 'الكل' },
  { key: 'manufacturing', en: 'Manufacturing', ar: 'التصنيع' },
  { key: 'quality', en: 'Quality', ar: 'الجودة' },
  { key: 'news', en: 'Industry News', ar: 'أخبار الصناعة' },
  { key: 'sustainability', en: 'Sustainability', ar: 'الاستدامة' },
]

function BlogSVG() {
  return (
    <div className="relative w-full h-full">
      <Image src={siteImages.blog.manufacturing} alt="" fill className="object-cover" />
    </div>
  )
}

function BlogThumbnailSVG({ index }: { index: number }) {
  const images = [siteImages.blog.leather, siteImages.blog.quality, siteImages.blog.export]
  return (
    <div className="relative w-full h-full">
      <Image src={images[index % images.length]} alt="" fill className="object-cover" />
    </div>
  )
}

export default function BlogPage({ lang }: { lang?: Locale }) {
  const resolvedLang = lang ?? 'en'
  const dict = dictionaries[resolvedLang]
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeCategory = searchParams.get('category') || 'all'
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts
    return blogPosts.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  const featured = activeCategory === 'all' ? blogPosts[0] : filteredPosts[0]
  const gridPosts = activeCategory === 'all'
    ? paginatedPosts.filter((p) => p.slug !== featured?.slug)
    : paginatedPosts

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all' || value === '1') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    if (key === 'category') params.delete('page')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function getReadingTimeEstimate(post: typeof blogPosts[0]): number {
    const excerptWords = post.excerpt.en.split(/\s+/).length
    const titleWords = post.title.en.split(/\s+/).length
    const estWords = (excerptWords + titleWords) * 12
    return Math.max(1, Math.round(estWords / 200))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(resolvedLang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: resolvedLang === 'ar' ? 'المدونة' : 'Blog' }]} lang={resolvedLang} />
        <SectionHeader
          label={resolvedLang === 'ar' ? 'المدونة' : 'BLOG'}
          title={resolvedLang === 'ar' ? 'رؤى الصناعة' : 'Industry Insights'}
          description={resolvedLang === 'ar'
            ? 'تابع آخر أخبار صناعة تصنيع الأحذية'
            : 'Stay updated with the latest in footwear manufacturing'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => updateParams('category', cat.key)}
              className={`body-sm px-4 py-2 rounded-full transition-colors ${
                activeCategory === cat.key
                  ? 'text-accent border border-border-gold'
                  : 'text-text-muted border border-transparent hover:text-text-primary'
              }`}
            >
              {cat[resolvedLang]}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="body-lg">
              {resolvedLang === 'ar' ? 'لا توجد مقالات في هذا التصنيف' : 'No articles found in this category'}
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="card overflow-hidden mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto">
                    <BlogSVG />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="label-tag mb-3 block">
                      {featured.categoryLabel[resolvedLang]}
                    </span>
                    <h2 className="heading-sm mb-3">
                      {featured.title[resolvedLang]}
                    </h2>
                    <p className="body-md mb-4">
                      {featured.excerpt[resolvedLang]}
                    </p>
                    <p className="body-sm text-text-dim mb-4">
                      {formatDate(featured.date)}
                    </p>
                    <Link
                      href={`/${resolvedLang}/blog/${featured.slug}`}
                      className="text-accent body-sm font-medium hover:text-gold-light transition-colors"
                    >
                      {resolvedLang === 'ar' ? 'اقرأ المزيد' : 'Read More'} →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <SectionGrid cols={2}>
              {gridPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${resolvedLang}/blog/${post.slug}`}
                  className="group card overflow-hidden"
                >
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <BlogThumbnailSVG index={0} />
                  </div>
                  <span className="label-tag block mb-2">
                    {post.categoryLabel[resolvedLang]}
                  </span>
                  <h3 className="heading-sm mb-2 group-hover:text-accent transition-colors">
                    {post.title[resolvedLang]}
                  </h3>
                  <p className="body-sm line-clamp-2 mb-3">
                    {post.excerpt[resolvedLang]}
                  </p>
                  <p className="body-sm text-text-dim">
                    {formatDate(post.date)}
                  </p>
                </Link>
              ))}
            </SectionGrid>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => updateParams('page', String(currentPage - 1))}
                  disabled={currentPage <= 1}
                  className="btn-secondary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {resolvedLang === 'ar' ? 'السابق' : 'Previous'}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => updateParams('page', String(page))}
                    className={`h-10 w-10 rounded-xl text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-accent text-bg-primary'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => updateParams('page', String(currentPage + 1))}
                  disabled={currentPage >= totalPages}
                  className="btn-secondary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {resolvedLang === 'ar' ? 'التالي' : 'Next'}
                </button>
              </div>
            )}
          </>
        )}
      </Section>
    </>
  )
}
