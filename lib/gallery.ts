export type GalleryCategory = 'floral' | 'luxury' | 'gifts' | 'sweets'

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  title: string
  isCustom?: boolean
}

export const galleryFilters = [
  {
    category: 'All',
    id: 'all',
  },
  {
    category: 'Floral',
    id: 'floral',
  },
  {
    category: 'Luxury',
    id: 'luxury',
  },
  {
    category: 'Gifts',
    id: 'gifts',
  },
  {
    category: 'Sweets',
    id: 'sweets',
  },
]

export const galleryStorageKey = 'MK Creation Hub-gallery-images'
export const adminSessionKey = 'MK Creation Hub-admin-logged-in'

export const defaultImages: GalleryImage[] = [
  {
    id: 'jarda-decoration',
    src: '/gallery/jarda-decoration.png',
    alt: 'Tiered Jarda sweet decoration',
    category: 'sweets',
    title: 'Jarda Decoration',
  },
  {
    id: 'jarda-decoration-with-flowers',
    src: '/gallery/jarda-decoration-with-flowers.png',
    alt: 'Jarda sweet decoration with flowers',
    category: 'sweets',
    title: 'Jarda Decoration with Flowers',
  },
  {
    id: 'chocolate-tower',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UMsIbcL4YX91sw0OyZ6tspfBzdTr47.png',
    alt: 'Red KitKat chocolate tower with flowers',
    category: 'luxury',
    title: 'Chocolate Tower',
  },
  {
    id: 'dry-fruits-packing',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r8bVI2I79YDmStDbSAFPOV8Pl5LU31.png',
    alt: 'Red roses with baby breath flowers',
    category: 'floral',
    title: 'Dry Fruits Packing',
  },
  {
    id: 'luxury-chocolate-tower',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TPeycms6G9DAlEpXKs7MUXaGBp2mJI.png',
    alt: 'Luxury Ferrero Rocher tower with pink flowers',
    category: 'luxury',
    title: 'Luxury Chocolate Tower',
  },
  {
    id: 'decorative-gift-baskets',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OAmTYEQVzXzILfFVDtoe9QWqoAQ7eo.png',
    alt: 'Colorful decorated gift baskets',
    category: 'gifts',
    title: 'Decorative Gift Baskets',
  },
  {
    id: 'premium-fruit-dome',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sD2WzqfyXEfnf2Z4FbQ4ZaetpvOccc.png',
    alt: 'Fruit and flower dome arrangement',
    category: 'luxury',
    title: 'Premium Fruit Dome',
  },
  {
    id: 'chocolate-gift-stand',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Wk2OZgGs3zRAdDnNy0gLcE2Ds3s1TE.png',
    alt: 'Multi-tiered wooden gift stand',
    category: 'gifts',
    title: 'Chocolate Gift Stand',
  },
  {
    id: 'square-trays',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-10-29-vZSpc3BIHItwuMGyFN0Rj6ancqKVmV.png',
    alt: 'Pink and purple flower trays arrangement',
    category: 'floral',
    title: 'Square Trays',
  },
  {
    id: 'indian-wedding-gift-pack',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-21-15.png-qPeKr5S24VvLK3VaXVEZHYnozn1BOY.jpeg',
    alt: 'Indian wedding gift boxes with bangles',
    category: 'gifts',
    title: 'Indian Wedding Gift Pack',
  },
  {
    id: 'packing-with-cloth',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-22-52-TrP6IDFzOjodpLKdyRYWU3xYXhDs7m.png',
    alt: 'Orange fan decorative arrangements',
    category: 'luxury',
    title: 'Packing with cloth',
  },
  {
    id: 'skincare-beauty-box',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-30-58-jGr7RMWyxdDZiYq1s9QVmju8ihMjOd.png',
    alt: 'Skincare and beauty gift box',
    category: 'gifts',
    title: 'Skincare Beauty Box',
  },
  {
    id: 'diaper-cake-with-dinosaur',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-28-01-j4pKKnSuNOaLsj7TWq3IblVRDqhl8R.png',
    alt: 'Diaper cake with dinosaur toy',
    category: 'luxury',
    title: 'Diaper Cake with Dinosaur',
  },
  {
    id: 'baby-boy-gift',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-25-44-Gg0mrtr2Jt8gUHX5vw9I85kFXsY0oJ.png',
    alt: 'Baby boy gift display with clothes',
    category: 'gifts',
    title: 'Baby Boy Gift',
  },
  {
    id: 'multi-tier-gift-boxes',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-22-18-IFEeXFxxAZV93CDN1oZNMDTE5FZRSA.png',
    alt: 'Multi-tier gift boxes with flowers',
    category: 'gifts',
    title: 'Multi-tier Gift Boxes',
  },
  {
    id: 'luxury-packing-trays',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-22-39-dw1dM4f0VYJUJE80kLfCGzQuQLERr4.png',
    alt: 'Yellow basket flower arrangements',
    category: 'floral',
    title: 'Luxury packing Trays',
  },
  {
    id: 'groom-packing',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-31-43-2SgTR1VxEAu0kKS9BgZC9Gu9FbNaqn.png',
    alt: 'Bridal outfit display with flowers',
    category: 'luxury',
    title: 'Groom packing',
  },
  {
    id: 'gift-basket',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-26-36-6caxaVDGyBRWZMB9FDFz4nXfxEfaja.png',
    alt: 'Blue balloons gift basket arrangement',
    category: 'gifts',
    title: 'Gift Basket',
  },
  {
    id: 'wooden-trays-with-handle',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-20-04-kOLShXxAA0FpwuSnhec2q92SJjOcxm.png',
    alt: 'White flower arrangement boxes',
    category: 'floral',
    title: 'Wooden Trays with handle',
  },
  {
    id: 'baby-gift-basket',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-26-05-HRSYUs3fZS0FXQae71tVIGb9wktNZg.png',
    alt: 'Blue gift tower with ribbons',
    category: 'luxury',
    title: 'Baby Gift Basket',
  },
  {
    id: 'baby-shower',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-26-17-EHGvQWZ0KbLnqQj4pfT1RLfHQNBpw6.png',
    alt: 'Baby items collection display',
    category: 'gifts',
    title: 'Baby shower',
  },
  {
    id: 'welcome-baby-girl-gift',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-25-34-bJSIPPz4QXKENbgTcaBClnPtiAqzcM.png',
    alt: 'Welcome baby girl display',
    category: 'gifts',
    title: 'Welcome Baby Girl Gift',
  },
]
