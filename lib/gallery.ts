export type GalleryCategory =
  | 'bride'
  | 'groom'
  | 'clothing-fashion'
  | 'gift-hampers'
  | 'beauty'
  | 'footwear'
  | 'chocolates'
  | 'sweets'
  | 'dry-fruits'
  | 'fruits'
  | 'baby-gifts'
  | 'birthday-gifts'
  | 'videos'
  | 'floral'
  | 'luxury'
  | 'gifts'

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  title: string
  isCustom?: boolean
  blobPath?: string
}

export const galleryFilters = [
  {
    category: 'All',
    id: 'all',
  },
  {
    category: 'Bride Collection',
    id: 'bride',
  },
  {
    category: 'Groom Collection',
    id: 'groom',
  },
  {
    category: 'Clothing & Fashion',
    id: 'clothing-fashion',
  },
  {
    category: 'Gift Hampers',
    id: 'gift-hampers',
  },
  {
    category: 'Beauty & Cosmetics',
    id: 'beauty',
  },
  {
    category: 'Footwear',
    id: 'footwear',
  },
  {
    category: 'Chocolates',
    id: 'chocolates',
  },
  {
    category: 'Sweets',
    id: 'sweets',
  },
  {
    category: 'Dry Fruits',
    id: 'dry-fruits',
  },
  {
    category: 'Fruits',
    id: 'fruits',
  },
  {
    category: 'Baby Gifts',
    id: 'baby-gifts',
  },
  {
    category: 'Birthday Gifts',
    id: 'birthday-gifts',
  },
  {
    category: 'Videos',
    id: 'videos',
  },
]

export const uploadableGalleryCategories = galleryFilters
  .map((filter) => filter.id)
  .filter((id): id is GalleryCategory => id !== 'all' && id !== 'videos')

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
    category: 'chocolates',
    title: 'Chocolate Tower',
  },
  {
    id: 'dry-fruits-packing',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r8bVI2I79YDmStDbSAFPOV8Pl5LU31.png',
    alt: 'Red roses with baby breath flowers',
    category: 'dry-fruits',
    title: 'Dry Fruits Packing',
  },
  {
    id: 'luxury-chocolate-tower',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TPeycms6G9DAlEpXKs7MUXaGBp2mJI.png',
    alt: 'Luxury Ferrero Rocher tower with pink flowers',
    category: 'chocolates',
    title: 'Luxury Chocolate Tower',
  },
  {
    id: 'decorative-gift-baskets',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OAmTYEQVzXzILfFVDtoe9QWqoAQ7eo.png',
    alt: 'Colorful decorated gift baskets',
    category: 'gift-hampers',
    title: 'Decorative Gift Baskets',
  },
  {
    id: 'premium-fruit-dome',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sD2WzqfyXEfnf2Z4FbQ4ZaetpvOccc.png',
    alt: 'Fruit and flower dome arrangement',
    category: 'fruits',
    title: 'Premium Fruit Dome',
  },
  {
    id: 'chocolate-gift-stand',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Wk2OZgGs3zRAdDnNy0gLcE2Ds3s1TE.png',
    alt: 'Multi-tiered wooden gift stand',
    category: 'gift-hampers',
    title: 'Chocolate Gift Stand',
  },
  {
    id: 'square-trays',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-10-29-vZSpc3BIHItwuMGyFN0Rj6ancqKVmV.png',
    alt: 'Pink and purple flower trays arrangement',
    category: 'gift-hampers',
    title: 'Square Trays',
  },
  {
    id: 'indian-wedding-gift-pack',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-21-15.png-qPeKr5S24VvLK3VaXVEZHYnozn1BOY.jpeg',
    alt: 'Indian wedding gift boxes with bangles',
    category: 'birthday-gifts',
    title: 'Indian Wedding Gift Pack',
  },
  {
    id: 'packing-with-cloth',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-22-52-TrP6IDFzOjodpLKdyRYWU3xYXhDs7m.png',
    alt: 'Orange fan decorative arrangements',
    category: 'clothing-fashion',
    title: 'Packing with Cloth',
  },
  {
    id: 'skincare-beauty-box',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-30-58-jGr7RMWyxdDZiYq1s9QVmju8ihMjOd.png',
    alt: 'Skincare and beauty gift box',
    category: 'beauty',
    title: 'Skincare Beauty Box',
  },
  {
    id: 'diaper-cake-with-dinosaur',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-28-01-j4pKKnSuNOaLsj7TWq3IblVRDqhl8R.png',
    alt: 'Diaper cake with dinosaur toy',
    category: 'baby-gifts',
    title: 'Diaper Cake with Dinosaur',
  },
  {
    id: 'baby-boy-gift',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-25-44-Gg0mrtr2Jt8gUHX5vw9I85kFXsY0oJ.png',
    alt: 'Baby boy gift display with clothes',
    category: 'baby-gifts',
    title: 'Baby Boy Gift',
  },
  {
    id: 'multi-tier-gift-boxes',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-22-18-IFEeXFxxAZV93CDN1oZNMDTE5FZRSA.png',
    alt: 'Multi-tier gift boxes with flowers',
    category: 'gift-hampers',
    title: 'Multi-tier Gift Boxes',
  },
  {
    id: 'luxury-packing-trays',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-22-39-dw1dM4f0VYJUJE80kLfCGzQuQLERr4.png',
    alt: 'Yellow basket flower arrangements',
    category: 'gift-hampers',
    title: 'Luxury packing Trays',
  },
  {
    id: 'groom-packing',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-31-43-2SgTR1VxEAu0kKS9BgZC9Gu9FbNaqn.png',
    alt: 'Bridal outfit display with flowers',
    category: 'groom',
    title: 'Groom packing',
  },
  {
    id: 'gift-basket',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-26-36-6caxaVDGyBRWZMB9FDFz4nXfxEfaja.png',
    alt: 'Blue balloons gift basket arrangement',
    category: 'gift-hampers',
    title: 'Gift Basket',
  },
  {
    id: 'wooden-trays-with-handle',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-20-04-kOLShXxAA0FpwuSnhec2q92SJjOcxm.png',
    alt: 'White flower arrangement boxes',
    category: 'gift-hampers',
    title: 'Wooden Trays with handle',
  },
  {
    id: 'baby-gift-basket',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-26-05-HRSYUs3fZS0FXQae71tVIGb9wktNZg.png',
    alt: 'Blue gift tower with ribbons',
    category: 'baby-gifts',
    title: 'Baby Gift Basket',
  },
  {
    id: 'baby-shower',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-26-17-EHGvQWZ0KbLnqQj4pfT1RLfHQNBpw6.png',
    alt: 'Baby items collection display',
    category: 'baby-gifts',
    title: 'Baby shower',
  },
  {
    id: 'welcome-baby-girl-gift',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2026-07-07_12-25-34-bJSIPPz4QXKENbgTcaBClnPtiAqzcM.png',
    alt: 'Welcome baby girl display',
    category: 'baby-gifts',
    title: 'Welcome Baby Girl Gift',
  },
]
