import { Metadata } from 'next'
import GalleryClient from '@/components/GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery | MK Creation Hub Premium Gift Arrangements in Belagavi',
  description: 'Browse our stunning collection of wedding and engagement gift arrangements. Custom designed luxury packages with fresh flowers, chocolates, and premium decorations.',
  keywords: ['gift gallery', 'wedding gifts', 'engagement gifts', 'gift arrangements', 'Belagavi', 'custom packages'],
  openGraph: {
    title: 'MK Creation Hub Gallery - Premium Gift Arrangements',
    description: 'Stunning collection of custom-designed wedding and engagement gift packages',
    url: 'https://MK Creation Hub-gifts.com/gallery',
  },
}

export default function Gallery() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Our Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of beautifully crafted gift arrangements and decorations
          </p>
        </div>
      </section>

      {/* Client Component with Filters and Gallery */}
      <GalleryClient />
    </main>
  )
}
