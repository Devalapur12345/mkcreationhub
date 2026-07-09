import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MD Creation Hub | Premium Gift Packaging in Belagavi',
  description: 'Learn about MD Creation Hub - Your trusted source for premium wedding and engagement gift packaging in Belagavi. Over 5 years of excellence in custom gift arrangements.',
  keywords: ['about us', 'gift packaging', 'wedding arrangements', 'Belagavi', 'premium gifts'],
  openGraph: {
    title: 'About MD Creation Hub - Premium Wedding & Engagement Gift Packaging',
    description: 'Crafting beautiful moments through premium gift packaging since day one',
    url: 'https://MD Creation Hub-gifts.com/about',
  },
}

export default function About() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crafting beautiful moments through premium gift packaging since day one
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  At MD Creation Hub, we believe that every celebration deserves something special. Our journey began with a simple vision: to create beautiful, memorable gift arrangements that capture the essence of love and celebration.
                </p>
                <p>
                  With years of experience in the art of gift packaging and decoration, we have perfected the craft of transforming simple items into extraordinary expressions of care and affection. Each arrangement tells a story, carefully curated with premium flowers, luxurious chocolates, and thoughtful design.
                </p>
                <p>
                  Whether it's a wedding, engagement, or any special occasion, we take pride in creating arrangements that not only look stunning but also leave lasting impressions on those who receive them.
                </p>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TPeycms6G9DAlEpXKs7MUXaGBp2mJI.png"
                alt="Our luxury gift arrangements"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-card p-8 rounded-lg">
              <div className="text-4xl font-serif font-bold text-primary mb-4">✨</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in every arrangement, using only premium materials and paying attention to every detail.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-card p-8 rounded-lg">
              <div className="text-4xl font-serif font-bold text-primary mb-4">💝</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Creativity</h3>
              <p className="text-muted-foreground">
                Each piece is a unique creation, designed with artistic vision and customized to reflect your personal preferences.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-card p-8 rounded-lg">
              <div className="text-4xl font-serif font-bold text-primary mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Customer Care</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We work closely with you to bring your vision to life and exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-96 md:h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OAmTYEQVzXzILfFVDtoe9QWqoAQ7eo.png"
                alt="Diverse gift packaging collection"
                fill
                className="object-contain"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">What Makes Us Different</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-2xl text-primary flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Custom Designs</h3>
                    <p className="text-muted-foreground">Tailor-made arrangements that reflect your unique vision</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Premium Materials</h3>
                    <p className="text-muted-foreground">Only the finest flowers, chocolates, and decoration elements</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Fast Delivery</h3>
                    <p className="text-muted-foreground">Quick turnaround without compromising on quality</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Personalized Service</h3>
                    <p className="text-muted-foreground">Direct communication to ensure your vision is realized perfectly</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Highlight */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Dedicated to Your Celebration</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            With years of expertise and a passion for creating beautiful moments, we are committed to making your special day unforgettable through our premium gift packaging and decoration services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-card p-8 rounded-lg">
              <div className="text-5xl font-serif font-bold text-primary mb-4">1000+</div>
              <p className="text-foreground font-semibold mb-2">Happy Customers</p>
              <p className="text-muted-foreground">Delighted customers across weddings and engagements</p>
            </div>
            <div className="bg-card p-8 rounded-lg">
              <div className="text-5xl font-serif font-bold text-primary mb-4">5+</div>
              <p className="text-foreground font-semibold mb-2">Years Experience</p>
              <p className="text-muted-foreground">Perfecting our craft in premium gift packaging</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
