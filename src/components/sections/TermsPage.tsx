'use client'

import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'

const content = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: August 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        text: 'By accessing or using the EL WAHEED SHOES website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.',
      },
      {
        heading: 'Products & Services',
        text: 'EL WAHEED SHOES manufactures and supplies footwear products including casual shoes, sport shoes, formal shoes, safety boots, sandals, and boots. Product images and descriptions on this website are for reference purposes only. Actual products may vary in color, design, and specifications based on manufacturing requirements.',
      },
      {
        heading: 'Orders & Payment',
        text: 'All orders are subject to availability and acceptance. Pricing is provided upon request and may vary based on order quantity, materials, and customization requirements. Payment terms will be agreed upon individually for each order. We accept T/T bank transfers, L/C for large orders, and Western Union for smaller transactions.',
      },
      {
        heading: 'Shipping',
        text: 'Shipping terms are determined on a per-order basis. Standard production time is 30-45 days after order confirmation. EL WAHEED SHOES is not responsible for delays caused by customs, shipping carriers, or events beyond our control.',
      },
      {
        heading: 'Returns & Refunds',
        text: 'Due to the custom nature of our manufacturing, returns are handled on a case-by-case basis. Any quality issues must be reported within 7 days of receipt. Refund or replacement policies will be agreed upon in the manufacturing contract.',
      },
      {
        heading: 'Warranty',
        text: 'EL WAHEED SHOES provides quality assurance for all manufactured products. Warranty terms are specified in individual manufacturing agreements and cover defects in materials and workmanship under normal use conditions.',
      },
      {
        heading: 'Limitation of Liability',
        text: 'EL WAHEED SHOES shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the value of the products or services in question.',
      },
      {
        heading: 'Governing Law',
        text: 'These Terms of Service shall be governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any disputes shall be resolved through arbitration in Cairo, Egypt.',
      },
    ],
  },
  ar: {
    title: 'شروط الخدمة',
    lastUpdated: 'آخر تحديث: أغسطس 2026',
    sections: [
      {
        heading: 'قبول الشروط',
        text: 'باستخدام موقع الوليد أحذية وخدماته، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا لم توافق على هذه الشروط، يرجى عدم استخدام موقعنا أو خدماتنا.',
      },
      {
        heading: 'المنتجات والخدمات',
        text: 'تصنع وتوفر شركة الوليد أحذية منتجات أحذية تشمل الأحذية الكاجوية والرياضية والرسمية وأحذية السلامة والشباشب والبوت. صور المنتجات والأوصاف على هذا الموقع لأغراض مرجعية فقط.',
      },
      {
        heading: 'الطلبات والدفع',
        text: 'خاضعة لجميع الطلبات للتوفر والقبول. يتم توفير الأسعار عند الطلب وقد تختلف بناءً على كمية الطلب والمواد ومتطلبات التخصيص. شروط الدفع ستتم المفاوضة عليها بشكل منفصل لكل طلب.',
      },
      {
        heading: 'الشحن',
        text: 'تُحدد شروط الشحن على أساس كل طلب. وقت الإنتاج العادي 30-45 يوماً بعد تأكيد الطلب. ليست الشركة مسؤولة عن التأخيرات الناتجة عن الجمارك أو شركات الشحن أو الأحداث الخارجة عن سيطرتنا.',
      },
      {
        heading: 'الإرجاع والاسترداد',
        text: 'بسبب الطبيعة المخصصة لتصنيعنا، يتم التعامل مع الإرجاعات من حالة لأخرى. يجب الإبلاغ عن أي مشاكل في الجودة خلال 7 أيام من الاستلام. سيتم الاتفاق على سياسات الاسترداد أو الاستبدال في عقد التصنيع.',
      },
      {
        heading: 'الضمان',
        text: 'توفر شركة الوليد أحذية ضمان الجودة لجميع المنتجات المصنعة. تحدد شروط الضمان في اتفاقيات التصنيع الفردية وتشمل عيوب المواد والصناعة في ظروف الاستخدام العادية.',
      },
      {
        heading: 'حدود المسؤولية',
        text: 'لا تتحمل شركة الوليد أحذية المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية الناتجة عن استخدام موقعنا أو منتجاتنا. لا تتجاوز مسؤوليتنا الإجمالية قيمة المنتجات أو الخدمات المعنية.',
      },
      {
        heading: 'القانون الحاكم',
        text: 'تخضع شروط الخدمة هذه لقوانين جمهورية مصر العربية ويتم تفسيرها وفقاً لها. يتم حل أي نزاعات عن طريق التحكيم في القاهرة، مصر.',
      },
    ],
  },
}

export function TermsPage({ lang }: { lang: Locale }) {
  const t = content[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: t.title }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'الشروط' : 'LEGAL'}
          title={t.title}
          description={t.lastUpdated}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="max-w-3xl mx-auto space-y-10">
          {t.sections.map((section, i) => (
            <div key={i}>
              <h2 className="heading-sm mb-3">{section.heading}</h2>
              <p className="body-md">{section.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
