'use client'

import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'

const content = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: August 2026',
    sections: [
      {
        heading: 'Information Collection',
        text: 'We collect information you provide directly, such as your name, email address, phone number, and company details when you submit a contact form, request a quote, or subscribe to our newsletter. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and browsing behavior.',
      },
      {
        heading: 'Use of Information',
        text: 'We use the information we collect to respond to your inquiries, provide manufacturing quotes, send newsletter updates (with your consent), improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties.',
      },
      {
        heading: 'Cookies',
        text: 'Our website uses cookies and similar tracking technologies to enhance your browsing experience. Essential cookies are necessary for the website to function. Analytics cookies help us understand how visitors interact with our site. You can control cookie preferences through your browser settings.',
      },
      {
        heading: 'Data Security',
        text: 'We implement industry-standard security measures to protect your personal information. This includes SSL encryption, secure server infrastructure, and regular security audits. However, no method of transmission over the internet is 100% secure.',
      },
      {
        heading: 'Third Parties',
        text: 'We may share your information with trusted service providers who assist us in operating our website and conducting business, such as email service providers and analytics platforms. These third parties are contractually obligated to keep your information confidential.',
      },
      {
        heading: 'Your Rights',
        text: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us using the information provided below.',
      },
      {
        heading: 'Contact Us',
        text: 'If you have any questions about this Privacy Policy, please contact us at:\n\nEL WAHEED SHOES\nEl Mahalla El Kubra, Gharbia, Egypt\nEmail: ELWAHEED@GMAIL.COM\nPhone: +20 111 409 3000',
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: أغسطس 2026',
    sections: [
      {
        heading: 'جمع المعلومات',
        text: 'نجمع المعلومات التي تقدمها مباشرة، مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وبيانات شركتك عند إرسال نموذج اتصال أو طلب عرض سعر أو الاشتراك في النشرة الإخبارية. كما نجمع تلقائياً معلومات معينة عند زيارتك لموقعنا الإلكتروني.',
      },
      {
        heading: 'استخدام المعلومات',
        text: 'نستخدم المعلومات التي نجمعها للرد على استفساراتك، وتقديم عروض أسعار التصنيع، وإرسال تحديثات النشرة الإخبارية (بموافقتك)، وتحسين موقعنا وخدماتنا، والامتثال للالتزامات القانونية. لا نبيع معلوماتك الشخصية لأطراف ثالثة.',
      },
      {
        heading: 'ملفات تعريف الارتباط',
        text: 'يستخدم موقعنا ملفات تعريف الارتباط وتقنيات تتبع مماثلة لتحسين تجربة التصفح. ملفات تعريف الارتباط الأساسية ضرورية لعمل الموقع. ملفات تعريف الارتباط التحليلية تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا.',
      },
      {
        heading: 'أمان البيانات',
        text: 'نقوم بتطبيق تدابير أمان معايير الصناعة لحماية معلوماتك الشخصية. يشمل ذلك تشفير SSL البنية التحتية الآمنة للمخدم والتدقيق الأمني المنتظم. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%.',
      },
      {
        heading: 'الأطراف الثالثة',
        text: 'قد نشارك معلوماتك مع مزودي خدمات موثوقين يساعدوننا في تشغيل موقعنا وإجراء الأعمال، مثل مزودي خدمات البريد الإلكتروني ومنصات التحليل. هؤلاء الأطراف الثالثة ملزمون تعاقدياً بالحفاظ على سرية معلوماتك.',
      },
      {
        heading: 'حقوقك',
        text: 'لك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. يمكنك أيضاً إلغاء الاشتراك من الاتصالات التسويقية في أي وقت. لممارسة هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المذكورة أدناه.',
      },
      {
        heading: 'اتصل بنا',
        text: 'إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:\n\nالوحيد للاحذية\nالمحلة الكبرى، الغربية، مصر\nالبريد الإلكتروني: ELWAHEED@GMAIL.COM\nالهاتف: +20 111 409 3000',
      },
    ],
  },
}

export function PrivacyPage({ lang }: { lang: Locale }) {
  const t = content[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: t.title }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'الخصوصية' : 'LEGAL'}
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
              <p className="body-md whitespace-pre-line">{section.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
