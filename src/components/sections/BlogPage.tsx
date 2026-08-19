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
    slug: 'future-of-egyptian-footwear-manufacturing',
    title: { en: 'The Future of Egyptian Footwear Manufacturing', ar: 'مستقبل صناعة الأحذية المصرية' },
    excerpt: { en: 'Egypt is rapidly becoming a global hub for footwear production. Here\'s how local manufacturers are embracing technology and innovation.', ar: 'أصبحت مصر بسرعة مركزاً عالمياً لإنتاج الأحذية. إليك كيف تتبنى المصنعين المحليين التكنولوجيا والابتكار.' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-08-10',
    author: 'EL WAHEED SHOES Team',
    featured: true,
  },
  {
    slug: 'quality-control-in-modern-shoe-production',
    title: { en: 'Quality Control in Modern Shoe Production', ar: 'مراقبة الجودة في إنتاج الأحذية الحديثة' },
    excerpt: { en: 'Learn about the multi-stage quality inspection process that ensures every pair meets international standards.', ar: 'تعرّف على عملية فحص الجودة متعددة المراحل التي تضمن مطابقة كل زوج للمعايير الدولية.' },
    category: 'quality',
    categoryLabel: { en: 'Quality', ar: 'الجودة' },
    date: '2026-07-28',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'sustainable-materials-in-footwear',
    title: { en: 'Sustainable Materials in Footwear', ar: 'المواد المستدامة في صناعة الأحذية' },
    excerpt: { en: 'How eco-friendly materials are reshaping the footwear industry and what it means for your brand.', ar: 'كيف تعيد المواد الصديقة للبيئة تشكيل صناعة الأحذية وماذا يعني ذلك لعلامتك التجارية.' },
    category: 'sustainability',
    categoryLabel: { en: 'Sustainability', ar: 'الاستدامة' },
    date: '2026-07-15',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'oem-vs-private-label-whats-the-difference',
    title: { en: "OEM vs Private Label: What's the Difference?", ar: 'التصنيع بالعلامة التجارية مقابل العلامة الخاصة' },
    excerpt: { en: 'A comprehensive guide to understanding OEM and private label manufacturing and which option suits your business.', ar: 'دليل شامل لفهم التصنيع بالعلامة التجارية والعلامة الخاصة وأي خيار يناسب عملك.' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
    date: '2026-07-01',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'egypts-growing-role-in-global-footwear',
    title: { en: "Egypt's Growing Role in Global Footwear", ar: 'الدور المتزايد لمصر في صناعة الأحذية العالمية' },
    excerpt: { en: 'An analysis of how Egyptian footwear manufacturers are gaining recognition in international markets.', ar: 'تحليل لكيف تحصل مصنعي الأحذية المصرية على اعتراف في الأسواق الدولية.' },
    category: 'news',
    categoryLabel: { en: 'Industry News', ar: 'أخبار الصناعة' },
    date: '2026-06-18',
    author: 'EL WAHEED SHOES Team',
    featured: false,
  },
  {
    slug: 'how-to-choose-the-right-shoe-manufacturer',
    title: { en: 'How to Choose the Right Shoe Manufacturer', ar: 'كيف تختار المصنّع المناسب' },
    excerpt: { en: 'Key factors to consider when selecting a manufacturing partner for your footwear brand.', ar: 'العوامل الرئيسية التي يجب مراعاتها عند اختيار شريك التصنيع لعلامتك التجارية للأحذية.' },
    category: 'manufacturing',
    categoryLabel: { en: 'Manufacturing', ar: 'التصنيع' },
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
