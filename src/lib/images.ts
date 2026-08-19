export const siteImages = {
  hero: '/products/08-white-gold-sneaker.jpg',

  products: {
    casual: '/products/01-white-chunky-sneaker.jpg',
    sport: '/products/02-black-white-runner.jpg',
    formal: '/products/05-black-leather-sneaker.jpg',
    safety: '/products/09-beige-hightop-boot.jpg',
    sandal: '/products/12-brown-leather-sandal.jpg',
    boot: '/products/10-black-platform-boot.jpg',
  },

  productGallery: [
    '/products/01-white-chunky-sneaker.jpg',
    '/products/02-black-white-runner.jpg',
    '/products/03-beige-mesh-sneaker.jpg',
    '/products/04-navy-sneaker.jpg',
    '/products/05-black-leather-sneaker.jpg',
    '/products/06-pink-white-sneaker.jpg',
    '/products/07-grey-knit-slipon.jpg',
    '/products/08-white-gold-sneaker.jpg',
    '/products/09-beige-hightop-boot.jpg',
    '/products/10-black-platform-boot.jpg',
    '/products/12-brown-leather-sandal.jpg',
    '/products/13-red-black-kids-sandal.jpg',
    '/products/15-black-cross-slide.jpg',
    '/products/16-pink-flipflop.jpg',
    '/products/18-mens-mesh-slide.jpg',
    '/products/19-grey-walking-sneaker.jpg',
    '/products/20-kids-white-sneaker.jpg',
  ],

  factory: {
    overview: '/products/08-white-gold-sneaker.jpg',
    exterior: '/products/01-white-chunky-sneaker.jpg',
    productionLine: '/products/02-black-white-runner.jpg',
    leatherCutting: '/products/05-black-leather-sneaker.jpg',
    stitching: '/products/03-beige-mesh-sneaker.jpg',
    qualityInspection: '/products/04-navy-sneaker.jpg',
    finishedProducts: '/products/06-pink-white-sneaker.jpg',
    packaging: '/products/07-grey-knit-slipon.jpg',
    shipping: '/products/09-beige-hightop-boot.jpg',
  },

  blog: {
    leather: '/products/05-black-leather-sneaker.jpg',
    manufacturing: '/products/02-black-white-runner.jpg',
    quality: '/products/04-navy-sneaker.jpg',
    export: '/products/09-beige-hightop-boot.jpg',
  },

  logo: {
    main: '/brandkit/el-waheed-shoes-logo.png',
    horizontal: '/brandkit/logo-horizontal.png',
    light: '/brandkit/logo-light.png',
    icon: '/brandkit/icon-mark.png',
    qaLight: '/brandkit/qa-logo-horizontal-light.jpg',
  },
} as const

export function getProductImage(slug: string): string {
  const map: Record<string, string> = {
    'casual-shoes': siteImages.products.casual,
    'formal-shoes': siteImages.products.formal,
    'sport-shoes': siteImages.products.sport,
    'safety-boots': siteImages.products.safety,
    sandals: siteImages.products.sandal,
    boots: siteImages.products.boot,
  }
  return map[slug] || siteImages.products.casual
}
