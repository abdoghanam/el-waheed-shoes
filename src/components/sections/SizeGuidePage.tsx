'use client'

import { useState } from 'react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Section, SectionHeader } from '@/components/ui/Section'

const sizeData = [
  { eu: 35, usMen: '3.5', usWomen: '5', uk: '3', cm: '22.5' },
  { eu: 36, usMen: '4', usWomen: '5.5', uk: '3.5', cm: '23' },
  { eu: 37, usMen: '5', usWomen: '6.5', uk: '4.5', cm: '24' },
  { eu: 38, usMen: '5.5', usWomen: '7', uk: '5', cm: '24.5' },
  { eu: 39, usMen: '6.5', usWomen: '8', uk: '6', cm: '25.5' },
  { eu: 40, usMen: '7', usWomen: '8.5', uk: '6.5', cm: '26' },
  { eu: 41, usMen: '8', usWomen: '9.5', uk: '7.5', cm: '27' },
  { eu: 42, usMen: '8.5', usWomen: '10', uk: '8', cm: '27.5' },
  { eu: 43, usMen: '9.5', usWomen: '11', uk: '9', cm: '28.5' },
  { eu: 44, usMen: '10', usWomen: '11.5', uk: '9.5', cm: '29' },
  { eu: 45, usMen: '11', usWomen: '12.5', uk: '10.5', cm: '30' },
  { eu: 46, usMen: '11.5', usWomen: '13', uk: '11', cm: '30.5' },
  { eu: 47, usMen: '12.5', usWomen: '14', uk: '12', cm: '31.5' },
]

export default function SizeGuidePage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [activeGender, setActiveGender] = useState<'men' | 'women'>('men')

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'دليل المقاسات' : 'Size Guide' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'مرجع' : 'REFERENCE'}
          title={isAr ? 'دليل المقاسات' : 'Size Guide'}
          description={isAr ? 'دليل شامل لتحويل مقاسات الأحذية' : 'Comprehensive shoe size conversion for all our products'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveGender('men')}
            className={`px-5 py-2.5 rounded-xl body-sm font-medium transition-all ${
              activeGender === 'men' ? 'bg-accent text-bg-primary' : 'text-text-muted hover:text-text-primary border border-border'
            }`}
          >
            {isAr ? 'رجال' : "Men's"}
          </button>
          <button
            onClick={() => setActiveGender('women')}
            className={`px-5 py-2.5 rounded-xl body-sm font-medium transition-all ${
              activeGender === 'women' ? 'bg-accent text-bg-primary' : 'text-text-muted hover:text-text-primary border border-border'
            }`}
          >
            {isAr ? 'نساء' : "Women's"}
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-card">
                <th className="py-4 px-6 text-start label-tag">EU</th>
                <th className="py-4 px-6 text-start label-tag">
                  {activeGender === 'men' ? 'US Men' : 'US Women'}
                </th>
                <th className="py-4 px-6 text-start label-tag">UK</th>
                <th className="py-4 px-6 text-start label-tag">CM</th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row, i) => (
                <tr
                  key={row.eu}
                  className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-card/50'}`}
                >
                  <td className="py-3.5 px-6 body-md text-text-primary font-medium">{row.eu}</td>
                  <td className="py-3.5 px-6 body-md">
                    {activeGender === 'men' ? row.usMen : row.usWomen}
                  </td>
                  <td className="py-3.5 px-6 body-md">{row.uk}</td>
                  <td className="py-3.5 px-6 body-md">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="card">
            <h3 className="heading-sm mb-4">
              {isAr ? 'كيف تقيس قدماك' : 'How to Measure Your Foot'}
            </h3>
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 200 300" className="w-40 h-auto">
                <ellipse cx="100" cy="100" rx="55" ry="85" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
                <ellipse cx="100" cy="190" rx="45" ry="70" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
                <ellipse cx="70" cy="40" rx="12" ry="16" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                <ellipse cx="90" cy="25" rx="10" ry="14" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                <ellipse cx="110" cy="22" rx="10" ry="13" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                <ellipse cx="128" cy="28" rx="9" ry="12" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                <ellipse cx="140" cy="40" rx="8" ry="10" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                <line x1="45" y1="100" x2="155" y2="100" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="4 2" />
                <line x1="100" y1="15" x2="100" y2="275" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="4 2" />
              </svg>
            </div>
            <ol className="space-y-2 body-sm list-decimal list-inside">
              <li>{isAr ? 'ضع قدماك على ورقة بجانب جدار' : 'Place your foot on a piece of paper against a wall'}</li>
              <li>{isAr ? 'حدد أطول أصبع والكعب على الورقة' : 'Mark the longest toe and the heel on the paper'}</li>
              <li>{isAr ? 'قِس المسافة بين العلامتين بالسم' : 'Measure the distance between the two marks in cm'}</li>
              <li>{isAr ? 'طابق قياسك مع عمود CM أعلاه' : 'Match your measurement to the CM column above'}</li>
            </ol>
          </div>

          <div className="card">
            <h3 className="heading-sm mb-4">
              {isAr ? 'نصائح إضافية' : 'Additional Tips'}
            </h3>
            <ul className="space-y-3 body-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {isAr ? 'قِس قدماك في نهاية اليوم عندما تكون أكبر قليلاً' : 'Measure your feet at the end of the day when they are slightly larger'}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {isAr ? 'إذا كان مقاسك بين مقاسين، اختر الأكبر' : 'If you are between sizes, go for the larger size'}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {isAr ? 'قِس كلا القدمين واستخدم الأكبر' : 'Measure both feet and use the larger measurement'}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {isAr ? 'الأحذية الرياضية قد تحتاج مقاس أكبر بنصف' : 'Sports shoes may require half a size up'}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {isAr ? 'تواصل معنا إذا كنت تحتاج مساعدة في اختيار المقاس' : 'Contact us if you need help choosing the right size'}
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
