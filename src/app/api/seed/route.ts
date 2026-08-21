import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const categories = [
  { title: 'Casual Shoes', slug: 'casual', description: 'Comfortable everyday casual footwear', sortOrder: 1 },
  { title: 'Sport Shoes', slug: 'sport', description: 'High-performance athletic footwear', sortOrder: 2 },
  { title: 'Formal Shoes', slug: 'formal', description: 'Premium formal and dress footwear', sortOrder: 3 },
  { title: 'Safety Boots', slug: 'safety', description: 'Industrial safety and work boots', sortOrder: 4 },
  { title: 'Sandals', slug: 'sandals', description: 'Comfortable sandals and slides', sortOrder: 5 },
  { title: 'Boots', slug: 'boots', description: 'Fashion and utility boots', sortOrder: 6 },
  { title: 'Kids', slug: 'kids', description: 'Footwear for children', sortOrder: 7 },
]

const products = [
  {
    title: 'White Chunky Sneaker', titleAr: 'حذاء أبيض بوزن ثقيل', slug: 'casual-chunky-sneaker',
    shortDescription: 'Premium chunky sole sneaker with breathable upper, perfect for casual everyday wear.',
    shortDescriptionAr: 'حذاء كاجوال بزجاجة سميكة وعلوي قابل للتنفس، مثالي لارتداء اليوم اليومي.',
    categorySlug: 'casual', materials: ['PU Leather', 'EVA Sole', 'Textile Lining'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Grey', hex: '#9E9E9E' }],
    features: ['Thick chunky sole for extra comfort', 'Breathable mesh panels', 'Reinforced heel counter', 'Padded collar and tongue', 'Lightweight EVA midsole'],
    featuresAr: ['نعل سميك لإراحة إضافية', 'أجزاء شبك قابلة للتنفس', 'كعب مقوى', 'ياقة ولسان مبطّن', 'نعل وسط EVA خفيف الوزن'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001', 'CE'], weight: '350g', weightAr: '350 جرام',
    usage: 'Casual daily wear, walking, lifestyle', usageAr: 'ارتداء يومي كاجوال، مشي، نمط حياة',
    featured: true, sortOrder: 1,
  },
  {
    title: 'Black & White Runner', titleAr: 'حذاء جري أبيض وأسود', slug: 'sport-runner',
    shortDescription: 'Lightweight running shoe with responsive cushioning and dynamic support system.',
    shortDescriptionAr: 'حذاء جري خفيف الوزن مع وسادة استجابة ونظام دعم ديناميكي.',
    categorySlug: 'sport', materials: ['Engineered Mesh', 'TPU Support', 'Rubber Outsole'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [{ name: 'Black/White', hex: '#1A1A1A' }, { name: 'White/Black', hex: '#F5F5F5' }],
    features: ['Responsive foam cushioning', 'Dynamic arch support', 'Flex grooves for natural motion', 'Quick-lace system', 'Reflective heel tab'],
    featuresAr: ['وسادة رغوة استجابة', 'دعم قوس ديناميكي', 'أخاديد مرونة للحركة الطبيعية', 'نظام ربط سريع', 'علامة كعب عاكسة'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001', 'CE'], weight: '280g', weightAr: '280 جرام',
    usage: 'Running, jogging, gym training', usageAr: 'جري، ركض، تدريب في الجيم',
    featured: false, sortOrder: 2,
  },
  {
    title: 'Beige Mesh Sneaker', titleAr: 'حذاء بيج شبك', slug: 'casual-mesh-sneaker',
    shortDescription: 'Ultra-breathable mesh sneaker with modern silhouette for all-day comfort.',
    shortDescriptionAr: 'حذاء شبك فائق التنفس مع خطوط عصرية لراحة طوال اليوم.',
    categorySlug: 'casual', materials: ['Knit Mesh', 'Memory Foam Insole', 'Rubber Sole'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [{ name: 'Beige', hex: '#D4C5A9' }, { name: 'White', hex: '#F5F5F5' }],
    features: ['360° breathable knit upper', 'Memory foam insole', 'Flexible rubber outsole', 'Lightweight under 300g', 'Washable material'],
    featuresAr: ['علوي حيوي قابل للتنفس 360°', 'نعل داخلي فوم متذكر', 'نعل خارجي مرن من المطاط', 'خفيف الوزن أقل من 300 جرام', 'قابل للغسل'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001'], weight: '280g', weightAr: '280 جرام',
    usage: 'Casual wear, walking, travel', usageAr: 'ارتداء كاجوال، مشي، سفر',
    featured: false, sortOrder: 3,
  },
  {
    title: 'Navy Casual Sneaker', titleAr: 'حذاء كاجوال كحلي', slug: 'casual-navy-sneaker',
    shortDescription: 'Classic navy sneaker with versatile design suitable for work and leisure.',
    shortDescriptionAr: 'حذاء كحلي كلاسيكي بتصميم مناسب للعمل والترفيه.',
    categorySlug: 'casual', materials: ['Canvas', 'EVA Midsole', 'Rubber Outsole'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [{ name: 'Navy', hex: '#1B2A4A' }, { name: 'Dark Grey', hex: '#4A4A4A' }],
    features: ['Classic low-top design', 'Reinforced toe cap', 'Anti-slip rubber outsole', 'Cushioned ankle support', 'Easy-care canvas material'],
    featuresAr: ['تصميم كلاسيكي منخفض', 'مدخل مقوّى', 'نعل خارجي مقاوم للانزلاق', 'دعم الكاحل المبطّن', 'قماش سهل العناية'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001'], weight: '310g', weightAr: '310 جرام',
    usage: 'Work, casual outings, travel', usageAr: 'عمل، نزهات كاجوال، سفر',
    featured: false, sortOrder: 4,
  },
  {
    title: 'Premium Leather Sneaker', titleAr: 'حذاء جلد فاخر', slug: 'premium-leather',
    shortDescription: 'Handcrafted genuine leather sneaker with premium finishes and comfort technology.',
    shortDescriptionAr: 'حذاء جلد طبيعي مصنوع يدوياً بلمسات فاخرة وتكنولوجيا الراحة.',
    categorySlug: 'formal', materials: ['Genuine Leather', 'Leather Lining', 'Leather Sole'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'Dark Brown', hex: '#3E2723' }],
    features: ['Full-grain Italian leather upper', 'Leather lining for breathability', 'Cushioned memory foam insole', 'Hand-stitched detailing', 'Blake stitched construction'],
    featuresAr: ['علوي جلد إيطالي كامل الحبيبات', 'بطانة جلد طبيعي للتنفس', 'نعل داخلي فوم متذكر مبطّن', 'تفاصيل مخيطة يدوياً', 'بناء مخيط Blake'],
    moq: '200 pairs', moqAr: '200 زوج', leadTime: '30-35 days', leadTimeAr: '30-35 يوم',
    certifications: ['ISO 9001', 'CE', 'REACH'], weight: '380g', weightAr: '380 جرام',
    usage: 'Business meetings, formal events, premium casual', usageAr: 'اجتماعات عمل، مناسبات رسمية، كاجوال فاخر',
    featured: false, sortOrder: 5,
  },
  {
    title: 'Pink & White Women Sneaker', titleAr: 'حذاء نسائي وردي وأبيض', slug: 'women-pink-sneaker',
    shortDescription: 'Elegant women sneaker with pink accents and superior comfort fit.',
    shortDescriptionAr: 'حذاء نسائي أنيق مع لمسات وردية ومريحة.',
    categorySlug: 'casual', materials: ['PU Leather', 'Suede Panel', 'EVA Sole'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [{ name: 'Pink/White', hex: '#F8BBD0' }, { name: 'White/Pink', hex: '#FFFFFF' }],
    features: ['Feminine silhouette design', 'Suede accent panels', 'Cushioned arch support', 'Flexible lightweight sole', 'Easy slip-on with laces'],
    featuresAr: ['تصميم حيوي أنثوي', 'ألواح لمسات سويد', 'دعم قوس مبطّن', 'نعل خفيف مرن', 'سهل الارتداء مع أربطة'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001'], weight: '270g', weightAr: '270 جرام',
    usage: 'Casual wear, shopping, social outings', usageAr: 'ارتداء كاجوال، تسوق، نزهات اجتماعية',
    featured: false, sortOrder: 6,
  },
  {
    title: 'Grey Knit Slip-On', titleAr: 'حذاء رمادي شبكي انزلاقي', slug: 'casual-knit-slipon',
    shortDescription: 'Minimalist knit slip-on with adaptive stretch and ultra-comfortable fit.',
    shortDescriptionAr: 'حذاء شبكي بسيط انزلاقي مع مرونة تكيّفية ومريحة.',
    categorySlug: 'casual', materials: ['Flyknit Upper', 'Memory Foam', 'TPU Outsole'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [{ name: 'Grey', hex: '#9E9E9E' }, { name: 'Black', hex: '#1A1A1A' }],
    features: ['Sock-like adaptive fit', 'One-pull elastic collar', 'Antibacterial insole', 'Machine washable', 'No-tie convenience'],
    featuresAr: ['ملاءمة متكيفة كالجوارب', 'ياقة مطاطية سحب واحدة', 'نعل داخلي مضاد للبكتيريا', 'قابل للغسل في الغسالة', 'راحة بدون ربط'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001'], weight: '240g', weightAr: '240 جرام',
    usage: 'Office wear, casual outings, travel', usageAr: 'ارتداء مكتب، نزهات كاجوال، سفر',
    featured: false, sortOrder: 7,
  },
  {
    title: 'White & Gold Premium Sneaker', titleAr: 'حذاء أبيض وذهبي فاخر', slug: 'hero-sneaker',
    shortDescription: 'Signature hero product combining luxury design with everyday comfort.',
    shortDescriptionAr: 'المنتج الرئيسي المميز يجمع بين التصميم الفاخر والراحة اليومية.',
    categorySlug: 'casual', materials: ['Premium Leather', 'Gold Hardware', 'Memory Foam', 'Leather Lining'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [{ name: 'White/Gold', hex: '#FFD700' }, { name: 'White/Silver', hex: '#C0C0C0' }],
    features: ['Premium full-grain leather upper', '24K gold-plated hardware accents', 'Italian memory foam insole', 'Hand-stitched welt construction', 'Limited edition numbering', 'Premium dust bag included'],
    featuresAr: ['علوي جلد طبيعي كامل الحبيبات فاخر', 'قطع ذهب عيار 24', 'نعل داخلي فوم متذكر إيطالي', 'بناء مخيط يدوياً', 'ترقيم إصدار محدود', 'حقيبة غبار فاخرة مرافقة'],
    moq: '100 pairs', moqAr: '100 زوج', leadTime: '35-40 days', leadTimeAr: '35-40 يوم',
    certifications: ['ISO 9001', 'CE', 'REACH'], weight: '400g', weightAr: '400 جرام',
    usage: 'Premium casual, luxury lifestyle, fashion events', usageAr: 'كاجوال فاخر، نمط حياة فاخر، أحداث أزياء',
    featured: true, sortOrder: 8,
  },
  {
    title: 'Safety Work Boot', titleAr: 'حذاء عمل للسلامة', slug: 'safety-boot',
    shortDescription: 'EN-rated safety boot with steel toe cap and anti-slip sole for industrial use.',
    shortDescriptionAr: 'حذاء سلامة معتمد بمدخل فولاذي ونعل مقاوم للانزلاق للاستخدام الصناعي.',
    categorySlug: 'safety', materials: ['Full-Grain Leather', 'Steel Toe Cap', 'PU/TPU Sole'],
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    colors: [{ name: 'Beige', hex: '#D4C5A9' }, { name: 'Black', hex: '#1A1A1A' }, { name: 'Brown', hex: '#6D4C41' }],
    features: ['EN ISO 20345 S3 steel toe', 'Anti-puncture midsole plate', 'Waterproof leather upper', 'Oil and slip-resistant outsole', 'ESD discharge protection', 'High-visibility reflective elements'],
    featuresAr: ['مدخل فولاذي معتمد EN ISO 20345 S3', 'صفحة نعل وسط مقاومة للثقب', 'علوي جلد مقاوم للماء', 'نعل خارجي مقاوم للزيت والانزلاق', 'حماية ESD من التفريغ الكهروستاتيكي', 'عناصر عاكسة عالية الوضوح'],
    moq: '200 pairs', moqAr: '200 زوج', leadTime: '30-35 days', leadTimeAr: '30-35 يوم',
    certifications: ['ISO 9001', 'CE', 'EN ISO 20345 S3'], weight: '580g', weightAr: '580 جرام',
    usage: 'Construction, manufacturing, mining, industrial work', usageAr: 'بناء، تصنيع، تعدين، عمل صناعي',
    featured: false, sortOrder: 9,
  },
  {
    title: 'Black Platform Boot', titleAr: 'بوت أسود ب_platform', slug: 'fashion-boot',
    shortDescription: 'Bold platform boot with chunky sole and premium leather finish.',
    shortDescriptionAr: 'بوت جريء ب_platform مع نعل سميك وتشطيب جلد فاخر.',
    categorySlug: 'boots', materials: ['PU Leather', 'Platform EVA Sole', 'Textile Lining'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'Dark Brown', hex: '#3E2723' }],
    features: ['4cm platform sole for added height', 'Side zipper for easy entry', 'Padded collar for ankle comfort', 'Durable scuff-resistant finish', 'Traction pattern outsole'],
    featuresAr: ['نعل platform 4 سم لارتفاع إضافي', 'سحّاب جانبي لسهولة الارتداء', 'ياقة مبطنة لراحة الكاحل', 'تشطيب مقاوم للخدوش', 'نعل خارجي بنمط مقاوم للانزلاق'],
    moq: '200 pairs', moqAr: '200 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001'], weight: '450g', weightAr: '450 جرام',
    usage: 'Fashion, going out, streetwear style', usageAr: 'أزياء، خروج، أسلوب الشارع',
    featured: false, sortOrder: 10,
  },
  {
    title: 'Brown Leather Sandal', titleAr: 'صندل جلد بني', slug: 'leather-sandal',
    shortDescription: 'Handcrafted genuine leather sandal with cushioned footbed and adjustable straps.',
    shortDescriptionAr: 'صندل جلد طبيعي مصنوع يدوياً مع نعل مبطّن وأحزمة قابلة للتعديل.',
    categorySlug: 'sandals', materials: ['Genuine Leather', 'Leather Insole', 'Rubber Outsole'],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [{ name: 'Brown', hex: '#6D4C41' }, { name: 'Tan', hex: '#C4A882' }, { name: 'Black', hex: '#1A1A1A' }],
    features: ['Hand-stitched genuine leather straps', 'Contoured memory foam footbed', 'Adjustable buckle closures', 'Flexible rubber outsole', 'Anti-bacterial leather treatment'],
    featuresAr: ['أحزمة جلد طبيعي مخيطة يدوياً', 'نعل مقوّس بفوم متذكر', 'أقفال مشبك قابلة للتعديل', 'نعل خارجي مرن من المطاط', 'علاج جلد مضاد للبكتيريا'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001'], weight: '220g', weightAr: '220 جرام',
    usage: 'Summer wear, beach, casual outings', usageAr: 'ارتداء صيفي، شاطئ، نزهات كاجوال',
    featured: false, sortOrder: 12,
  },
  {
    title: 'Kids Red & Black Sandal', titleAr: 'صندل أطفال أحمر وأسود', slug: 'kids-sandal',
    shortDescription: 'Durable kids sandal with secure velcro straps and anti-slip sole.',
    shortDescriptionAr: 'صندل أطفال متين مع أحزمة فيلكرو آمنة ونعل مقاوم للانزلاق.',
    categorySlug: 'kids', materials: ['PU Leather', 'EVA Sole', 'Velcro Straps'],
    sizes: ['26', '27', '28', '29', '30', '31', '32'],
    colors: [{ name: 'Red/Black', hex: '#D32F2F' }, { name: 'Blue/Black', hex: '#1565C0' }],
    features: ['Easy velcro strap closure', 'Toe guard for protection', 'Anti-slip rubber outsole', 'Lightweight for active kids', 'Quick-dry material'],
    featuresAr: ['إغلاق فيلكرو سهل', 'حامي أصابع للحماية', 'نعل خارجي مقاوم للانزلاق', 'خفيف الوزن للأطفال النشطين', 'سريع الجفاف'],
    moq: '500 pairs', moqAr: '500 زوج', leadTime: '20-25 days', leadTimeAr: '20-25 يوم',
    certifications: ['ISO 9001', 'CE'], weight: '150g', weightAr: '150 جرام',
    usage: 'Kids outdoor play, school, summer activities', usageAr: 'ألعاب خارجية للأطفال، مدرسة، أنشطة صيفية',
    featured: false, sortOrder: 13,
  },
  {
    title: 'Black Cross Slide', titleAr: 'صندل عريض أسود', slug: 'cross-slide',
    shortDescription: 'Modern cross-strap slide sandal with cushioned footbed for ultimate relaxation.',
    shortDescriptionAr: 'صندل حديث بأحزمة عريضة مع نعل مبطّن لراحة مطلقة.',
    categorySlug: 'sandals', materials: ['EVA Upper', 'EVA Sole', 'Quick-Dry Straps'],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'Grey', hex: '#9E9E9E' }, { name: 'Navy', hex: '#1B2A4A' }],
    features: ['Ergonomic cross-strap design', 'Quick-dry cushioned straps', 'Arch support contoured footbed', 'Lightweight EVA construction', 'Pool and shower safe'],
    featuresAr: ['تصميم عريض مريح', 'أحزمة مبطنة سريعة الجفاف', 'نعل مقوّس بدعم قوس', 'بناء خفيف الوزن من EVA', 'آمن للحمام وحوض السباحة'],
    moq: '500 pairs', moqAr: '500 زوج', leadTime: '20-25 days', leadTimeAr: '20-25 يوم',
    certifications: ['ISO 9001'], weight: '180g', weightAr: '180 جرام',
    usage: 'Pool, beach, indoor wear, relaxation', usageAr: 'حمام سباحة، شاطئ، ارتداء داخلي، راحة',
    featured: false, sortOrder: 15,
  },
  {
    title: 'Pink Women Flip-Flop', titleAr: 'صنفرة نسائية وردية', slug: 'women-flipflop',
    shortDescription: 'Comfortable women flip-flop with cushioned sole and water-resistant design.',
    shortDescriptionAr: 'صنفرة نسائية مريحة مع نعل مبطّن وتصميم مقاوم للماء.',
    categorySlug: 'sandals', materials: ['EVA', 'Rubber Sole', 'Textile Strap'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [{ name: 'Pink', hex: '#F8BBD0' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Coral', hex: '#FF7043' }],
    features: ['Cushioned thong strap design', 'Textured footbed for grip', 'Quick-dry water-resistant', 'Flexible rubber outsole', 'Lightweight travel-friendly'],
    featuresAr: ['تصميم حزام مبطّن', 'نعل مقوّس للcean', 'مقاوم للماء سريع الجفاف', 'نعل خارجي مرن من المطاط', 'خفيف الوزن مناسب للسفر'],
    moq: '500 pairs', moqAr: '500 زوج', leadTime: '20-25 days', leadTimeAr: '20-25 يوم',
    certifications: ['ISO 9001'], weight: '120g', weightAr: '120 جرام',
    usage: 'Beach, pool, vacation, casual wear', usageAr: 'شاطئ، حمام سباحة، إجازة، ارتداء كاجوال',
    featured: false, sortOrder: 16,
  },
  {
    title: 'Men Mesh Slide', titleAr: 'صندل شبك رجالي', slug: 'mens-mesh-slide',
    shortDescription: 'Breathable mesh slide with contoured footbed for men comfort.',
    shortDescriptionAr: 'صندل شبك قابل للتنفس مع نعل مقوّس لراحة الرجال.',
    categorySlug: 'sandals', materials: ['Mesh Upper', 'EVA Sole', 'Rubber Outsole'],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'Grey', hex: '#9E9E9E' }, { name: 'Navy', hex: '#1B2A4A' }],
    features: ['3D breathable mesh upper', 'Contoured arch support', 'Anti-odor treatment', 'Non-slip rubber outsole', 'Easy slip-on design'],
    featuresAr: ['علوي شبك ثلاثي الأبعاد قابل للتنفس', 'نعل مقوّس بدعم قوس', 'علاج مضاد للروائح', 'نعل خارجي من المطاط مقاوم للانزلاق', 'تصميم سهل الانزلاق'],
    moq: '500 pairs', moqAr: '500 زوج', leadTime: '20-25 days', leadTimeAr: '20-25 يوم',
    certifications: ['ISO 9001'], weight: '200g', weightAr: '200 جرام',
    usage: 'Casual, indoor, pool-side, gym', usageAr: 'كاجوال، داخلي، حمام السباحة، الجيم',
    featured: false, sortOrder: 18,
  },
  {
    title: 'Grey Walking Sneaker', titleAr: 'حذاء مشي رمادي', slug: 'walking-sneaker',
    shortDescription: 'Ergonomic walking shoe with stability control and shock absorption technology.',
    shortDescriptionAr: 'حذاء مشي مريح مع تحكم بالاستقرار وتقنية امتصاص الصدمات.',
    categorySlug: 'casual', materials: ['Mesh & Synthetic', 'Ortholite Insole', 'Rubber Outsole'],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [{ name: 'Grey', hex: '#9E9E9E' }, { name: 'Black/Grey', hex: '#424242' }],
    features: ['Stability control system', 'Shock-absorbing heel unit', 'Wide toe box for comfort', 'High-traction outsole pattern', 'Moisture-wicking lining'],
    featuresAr: ['نظام التحكم بالاستقرار', 'وحدة كعب امتصاص الصدمات', 'علوي واسع للراحة', 'نمط نعل خارجي عالي الارتكاز', 'بطانة ماصة للرطوبة'],
    moq: '300 pairs', moqAr: '300 زوج', leadTime: '25-30 days', leadTimeAr: '25-30 يوم',
    certifications: ['ISO 9001', 'CE'], weight: '320g', weightAr: '320 جرام',
    usage: 'Walking, light hiking, standing work', usageAr: 'مشي، مشي خفيف في الطبيعة، عمل واقف',
    featured: false, sortOrder: 19,
  },
  {
    title: 'Kids White Sneaker', titleAr: 'حذاء أطفال أبيض', slug: 'kids-sneaker',
    shortDescription: 'Durable kids sneaker with velcro closure and reinforced toe for active play.',
    shortDescriptionAr: 'حذاء أطفال متين مع إغلاق فيلكرو ومدخل مقوّى للعب النشط.',
    categorySlug: 'kids', materials: ['PU Leather', 'EVA Sole', 'Velcro Straps'],
    sizes: ['26', '27', '28', '29', '30', '31', '32', '33'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'White/Blue', hex: '#90CAF9' }, { name: 'White/Pink', hex: '#F8BBD0' }],
    features: ['Easy velcro strap closure', 'Reinforced toe cap for durability', 'Non-marking rubber sole', 'Cushioned insole for growing feet', 'Machine washable materials'],
    featuresAr: ['إغلاق فيلكرو سهل', 'مدخل مقوّى للمتانة', 'نعل مطاطي لا يترك علامات', 'نعل داخلي مبطّن للأقدام النامية', 'مواد قابلة للغسل في الغسالة'],
    moq: '500 pairs', moqAr: '500 زوج', leadTime: '20-25 days', leadTimeAr: '20-25 يوم',
    certifications: ['ISO 9001', 'CE'], weight: '180g', weightAr: '180 جرام',
    usage: 'School, play, everyday kids activities', usageAr: 'مدرسة، لعب، أنشطة يومية للأطفال',
    featured: false, sortOrder: 20,
  },
]

export async function POST() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    // Create categories
    const categoryMap: Record<string, string | number> = {}
    for (const cat of categories) {
      const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } } })
      if (existing.docs.length > 0) {
        categoryMap[cat.slug] = existing.docs[0].id
        results.push(`Category "${cat.slug}" exists`)
      } else {
        const created = await payload.create({ collection: 'categories', data: { title: cat.title, slug: cat.slug, description: cat.description, sortOrder: cat.sortOrder } })
        categoryMap[cat.slug] = created.id
        results.push(`Category "${cat.title}" created`)
      }
    }

    // Create/update products
    for (const product of products) {
      const existing = await payload.find({ collection: 'products', where: { slug: { equals: product.slug } } })
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'products', id: existing.docs[0].id,
          data: { features: product.features.map(f => ({ feature: f })), moq: product.moq, leadTime: product.leadTime, certifications: product.certifications.map(c => ({ certification: c })), weight: product.weight, usage: product.usage },
        })
        results.push(`Updated: ${product.slug}`)
      } else {
        const created = await payload.create({
          collection: 'products',
          data: {
            title: product.title, slug: product.slug, shortDescription: product.shortDescription,
            category: typeof categoryMap[product.categorySlug] === 'number' ? categoryMap[product.categorySlug] as number : undefined,
            materials: product.materials.map(m => ({ material: m })),
            availableSizes: product.sizes.map(s => ({ size: s })),
            availableColors: product.colors.map(c => ({ name: c.name, hex: c.hex })),
            features: product.features.map(f => ({ feature: f })),
            moq: product.moq, leadTime: product.leadTime,
            certifications: product.certifications.map(c => ({ certification: c })),
            weight: product.weight, usage: product.usage,
            featured: product.featured, isActive: true, sortOrder: product.sortOrder,
          },
        })
        await payload.update({
          collection: 'products', id: created.id,
          data: { title: product.titleAr, shortDescription: product.shortDescriptionAr, features: product.featuresAr.map(f => ({ feature: f })), moq: product.moqAr, leadTime: product.leadTimeAr, weight: product.weightAr, usage: product.usageAr },
        })
        results.push(`Created: ${product.title}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
