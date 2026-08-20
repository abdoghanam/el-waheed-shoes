'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import type { ReactNode } from 'react'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

interface GalleryItem {
  src: string
  alt: string
}

interface Category {
  titleEn: string
  titleAr: string
  images: GalleryItem[]
  icon: ReactNode
}

const categories: Category[] = [
  {
    titleEn: 'Factory Tour',
    titleAr: 'جولة المصنع',
    images: [
      { src: '/products/01-white-chunky-sneaker.jpg', alt: 'Factory production line' },
      { src: '/products/02-black-white-runner.jpg', alt: 'Quality inspection area' },
      { src: '/products/03-beige-mesh-sneaker.jpg', alt: 'Material storage' },
      { src: '/products/04-navy-sneaker.jpg', alt: 'Assembly workshop' },
      { src: '/products/05-black-leather-sneaker.jpg', alt: 'Finished goods warehouse' },
    ],
    icon: (
      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    titleEn: 'Products',
    titleAr: 'المنتجات',
    images: [
      { src: '/products/01-white-chunky-sneaker.jpg', alt: 'White chunky sneaker' },
      { src: '/products/02-black-white-runner.jpg', alt: 'Black and white runner' },
      { src: '/products/03-beige-mesh-sneaker.jpg', alt: 'Beige mesh sneaker' },
      { src: '/products/04-navy-sneaker.jpg', alt: 'Navy sneaker' },
      { src: '/products/05-black-leather-sneaker.jpg', alt: 'Black leather sneaker' },
      { src: '/products/06-pink-white-sneaker.jpg', alt: 'Pink and white sneaker' },
      { src: '/products/07-grey-knit-slipon.jpg', alt: 'Grey knit slip-on' },
      { src: '/products/08-white-gold-sneaker.jpg', alt: 'White gold sneaker' },
      { src: '/products/09-beige-hightop-boot.jpg', alt: 'Beige high-top boot' },
      { src: '/products/10-black-platform-boot.jpg', alt: 'Black platform boot' },
      { src: '/products/12-brown-leather-sandal.jpg', alt: 'Brown leather sandal' },
      { src: '/products/13-red-black-kids-sandal.jpg', alt: 'Red and black kids sandal' },
      { src: '/products/15-black-cross-slide.jpg', alt: 'Black cross slide' },
      { src: '/products/16-pink-flipflop.jpg', alt: 'Pink flip flop' },
      { src: '/products/18-mens-mesh-slide.jpg', alt: 'Men\'s mesh slide' },
      { src: '/products/19-grey-walking-sneaker.jpg', alt: 'Grey walking sneaker' },
      { src: '/products/20-kids-white-sneaker.jpg', alt: 'Kids white sneaker' },
    ],
    icon: (
      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    titleEn: 'Production Process',
    titleAr: 'عملية الإنتاج',
    images: [
      { src: '/products/02-black-white-runner.jpg', alt: 'Cutting and stitching' },
      { src: '/products/03-beige-mesh-sneaker.jpg', alt: 'Sole attachment' },
      { src: '/products/04-navy-sneaker.jpg', alt: 'Quality control' },
      { src: '/products/05-black-leather-sneaker.jpg', alt: 'Final assembly' },
      { src: '/products/06-pink-white-sneaker.jpg', alt: 'Finishing and polishing' },
      { src: '/products/07-grey-knit-slipon.jpg', alt: 'Packaging' },
    ],
    icon: (
      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titleEn: 'Our Team',
    titleAr: 'فريقنا',
    images: [
      { src: '/brandkit/el-waheed-shoes-logo.png', alt: 'El Waheed Shoes logo' },
      { src: '/brandkit/logo-horizontal.png', alt: 'Brand horizontal logo' },
      { src: '/brandkit/icon-mark.png', alt: 'Brand icon mark' },
    ],
    icon: (
      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    titleEn: 'Facilities',
    titleAr: 'المنشأة',
    images: [
      { src: '/products/08-white-gold-sneaker.jpg', alt: 'Showroom display' },
      { src: '/products/09-beige-hightop-boot.jpg', alt: 'Production floor' },
      { src: '/products/10-black-platform-boot.jpg', alt: 'Storage facility' },
    ],
    icon: (
      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    titleEn: 'Logistics',
    titleAr: 'اللوجستيات',
    images: [
      { src: '/products/09-beige-hightop-boot.jpg', alt: 'Packaging station' },
      { src: '/products/12-brown-leather-sandal.jpg', alt: 'Shipping area' },
      { src: '/products/15-black-cross-slide.jpg', alt: 'Distribution center' },
    ],
    icon: (
      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
]

function GalleryModal({
  category,
  lang,
  onClose,
}: {
  category: Category
  lang: Locale
  onClose: () => void
}) {
  const isAr = lang === 'ar'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-primary hover:bg-black/20 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="heading-sm mb-6 pr-10">
          {isAr ? category.titleAr : category.titleEn}
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {category.images.map((img) => (
            <div key={img.src} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.gallery }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'خلف الكواليس' : 'BEHIND THE SCENES'}
          title={dict.nav.gallery}
          description={dict.manufacturing.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionGrid cols={3}>
          {categories.map((cat) => (
            <button
              key={cat.titleEn}
              className="card text-center group cursor-pointer"
              onClick={() => setActiveCategory(cat)}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/5 text-accent mx-auto mb-5 group-hover:bg-accent/10 transition-colors">
                {cat.icon}
              </div>
              <h3 className="heading-sm mb-2">
                {isAr ? cat.titleAr : cat.titleEn}
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-1 mx-auto max-w-[180px]">
                {cat.images.slice(0, 6).map((img) => (
                  <div key={img.src} className="relative aspect-square overflow-hidden rounded-md">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="60px" />
                  </div>
                ))}
              </div>
              <p className="body-sm text-text-dim mt-3">
                {isAr ? `${cat.images.length} صور` : `${cat.images.length} photos`}
              </p>
            </button>
          ))}
        </SectionGrid>
      </Section>

      <Section>
        <div className="text-center">
          <p className="body-lg mb-8">
            {isAr
              ? 'تواصل معنا لترتيب زيارة للمصنع'
              : 'Contact us to schedule a factory tour'}
          </p>
          <Link href={`/${lang}/contact`} className="btn-primary">
            {isAr ? 'تواصل معنا' : 'Contact Us'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Section>

      {activeCategory && (
        <GalleryModal category={activeCategory} lang={lang} onClose={() => setActiveCategory(null)} />
      )}
    </>
  )
}
