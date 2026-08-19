'use client'

import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const values = [
  {
    titleEn: 'Craftsmanship',
    titleAr: 'الحرفية',
    descriptionEn: 'We believe in the art of shoemaking. Every stitch, every cut, every detail matters.',
    descriptionAr: 'نؤمن بفن صناعة الأحذية. كل غرزة، كل قطع، كل تفصيل مهم.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    titleEn: 'Innovation',
    titleAr: 'الابتكار',
    descriptionEn: 'We invest in modern technology and processes to deliver superior footwear solutions.',
    descriptionAr: 'نستثمر في التكنولوجيا والعمليات الحديثة لتقديم حلول أحذية متفوقة.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    titleEn: 'Teamwork',
    titleAr: 'عمل الفريق',
    descriptionEn: 'Our strength lies in our dedicated team of over 1,500 skilled professionals.',
    descriptionAr: 'قوتنا تكمن في فريقنا المتفاني المكون من أكثر من 1,500 متخصص.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    titleEn: 'Sustainability',
    titleAr: 'الاستدامة',
    descriptionEn: 'We are committed to eco-friendly practices and responsible manufacturing.',
    descriptionAr: 'ملتزمون بممارسات صديقة للبيئة والتصنيع المسؤول.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
]

const jobOpenings = [
  {
    titleEn: 'Quality Control Inspector',
    titleAr: 'مفتش مراقبة الجودة',
    departmentEn: 'Quality Assurance',
    departmentAr: 'ضمان الجودة',
    locationEn: 'El Mahalla El Kubra',
    locationAr: 'المحلة الكبرى',
    typeEn: 'Full-time',
    typeAr: 'دوام كامل',
  },
  {
    titleEn: 'Production Line Supervisor',
    titleAr: 'مشرف خط الإنتاج',
    departmentEn: 'Production',
    departmentAr: 'الإنتاج',
    locationEn: 'El Mahalla El Kubra',
    locationAr: 'المحلة الكبرى',
    typeEn: 'Full-time',
    typeAr: 'دوام كامل',
  },
  {
    titleEn: 'Footwear Designer',
    titleAr: 'مصمم أحذية',
    departmentEn: 'Design & Development',
    departmentAr: 'التصميم والتطوير',
    locationEn: 'El Mahalla El Kubra',
    locationAr: 'المحلة الكبرى',
    typeEn: 'Full-time',
    typeAr: 'دوام كامل',
  },
  {
    titleEn: 'Supply Chain Coordinator',
    titleAr: 'منسق سلسلة التوريد',
    departmentEn: 'Operations',
    departmentAr: 'العمليات',
    locationEn: 'El Mahalla El Kubra',
    locationAr: 'المحلة الكبرى',
    typeEn: 'Full-time',
    typeAr: 'دوام كامل',
  },
]

const benefits = [
  { titleEn: 'Competitive Salary', titleAr: 'راتب تنافسي' },
  { titleEn: 'Health Insurance', titleAr: 'تأمين صحي' },
  { titleEn: 'Training Programs', titleAr: 'برامج تدريب' },
  { titleEn: 'Career Growth', titleAr: 'نمو مهني' },
  { titleEn: 'Safe Workplace', titleAr: 'بيئة عمل آمنة' },
  { titleEn: 'Paid Leave', titleAr: 'إجازة مدفوعة' },
]

export default function CareersPage({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'وظائف' : 'Careers' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'الوظائف' : 'CAREERS'}
          title={isAr ? 'انضم إلى فريقنا' : 'Join Our Team'}
          description={isAr ? 'كن جزءاً من فريق يصنع الفرق في صناعة الأحذية' : 'Be part of a team making a difference in the footwear industry'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'قيمنا' : 'VALUES'}
          title={isAr ? 'القيم التي نؤمن بها' : 'The Values We Live By'}
          align="center"
        />
        <SectionGrid cols={2}>
          {values.map((value) => (
            <div key={value.titleEn} className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                {value.icon}
              </div>
              <h3 className="heading-sm mb-2">{isAr ? value.titleAr : value.titleEn}</h3>
              <p className="body-sm">{isAr ? value.descriptionAr : value.descriptionEn}</p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section dark={true}>
        <SectionHeader
          label={isAr ? 'الوظائف الشاغرة' : 'OPEN POSITIONS'}
          title={isAr ? 'الوظائف الحالية' : 'Current Openings'}
          align="center"
        />
        <div className="space-y-4 max-w-3xl mx-auto">
          {jobOpenings.map((job) => (
              <div key={job.titleEn} className="card group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="heading-sm mb-1">{isAr ? job.titleAr : job.titleEn}</h3>
                  <p className="body-sm">{isAr ? job.departmentAr : job.departmentEn} · {isAr ? job.locationAr : job.locationEn}</p>
                </div>
                <span className="label-tag">{isAr ? job.typeAr : job.typeEn}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center body-md mt-8">
          {isAr ? 'لم تجد وظيفة مناسبة؟ تواصل معنا على' : "Don't see the right fit? Reach out at"}{' '}
          <a href="mailto:ELWAHEED@GMAIL.COM" className="text-accent hover:underline">ELWAHEED@GMAIL.COM</a>
        </p>
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'المزايا' : 'BENEFITS'}
          title={isAr ? 'مزايا العمل معنا' : 'Benefits of Working with Us'}
          align="center"
        />
        <SectionGrid cols={3}>
          {benefits.map((benefit) => (
            <div key={benefit.titleEn} className="card text-center">
              <h3 className="heading-sm">{isAr ? benefit.titleAr : benefit.titleEn}</h3>
            </div>
          ))}
        </SectionGrid>
      </Section>
    </>
  )
}
