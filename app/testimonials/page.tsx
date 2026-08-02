import { Metadata } from 'next'
import ClientReviews from '@/components/ClientReviews'
import TestimonialsClient from '@/components/TestimonialsClient'

export const metadata: Metadata = {
  title: 'Testimonials | MK Creation Hub Customer Reviews',
  description: 'Read customer reviews and see success story images from MK Creation Hub gift arrangements.',
  openGraph: {
    title: 'MK Creation Hub Reviews & Testimonials',
    description: 'Customer reviews and success story images from MK Creation Hub',
    url: 'https://MK Creation Hub-gifts.com/testimonials',
  },
}

export default function TestimonialsPage() {
  return (
    <main className="bg-background">
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Testimonials</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real customer reviews, success stories, and beautiful moments from our gift arrangements
          </p>
        </div>
      </section>

      <TestimonialsClient />
      <ClientReviews />
    </main>
  )
}
