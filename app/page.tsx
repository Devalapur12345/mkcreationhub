import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                  Premium Gift Packaging
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mt-4 leading-tight">
                  Celebrate Love with Elegance
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beautifully crafted gift arrangements for weddings and engagements. Each piece is designed with care, featuring luxurious chocolates, fresh flowers, and premium presentation.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/gallery"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-medium"
                >
                  View Our Work
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 md:h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UMsIbcL4YX91sw0OyZ6tspfBzdTr47.png"
                alt="Premium gift arrangement with chocolates and flowers"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Our Collections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each gift arrangement is meticulously crafted to create unforgettable moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-secondary/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r8bVI2I79YDmStDbSAFPOV8Pl5LU31.png"
                  alt="Rose flower bouquet with chocolates"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Floral Bliss</h3>
                <p className="text-muted-foreground">Elegant bouquets with premium chocolates and decorative bases</p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-secondary/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TPeycms6G9DAlEpXKs7MUXaGBp2mJI.png"
                  alt="Luxury tiered chocolate tower gift"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Luxury Towers</h3>
                <p className="text-muted-foreground">Exquisite multi-tiered arrangements with Ferrero Rocher and fresh flowers</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-secondary/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sD2WzqfyXEfnf2Z4FbQ4ZaetpvOccc.png"
                  alt="Fruit and flower dome arrangement"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Fruit Arrangements</h3>
                <p className="text-muted-foreground">Fresh fruit displays with floral accents in elegant domes</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-medium"
            >
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-4">100%</div>
              <h3 className="font-semibold text-foreground mb-2">Custom Made</h3>
              <p className="text-muted-foreground text-sm">Each arrangement is tailored to your preferences</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-4">✓</div>
              <h3 className="font-semibold text-foreground mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">Only the finest flowers and chocolates used</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-4">Fast</div>
              <h3 className="font-semibold text-foreground mb-2">Quick Turnaround</h3>
              <p className="text-muted-foreground text-sm">Ready to impress on your special occasion</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-4">🎁</div>
              <h3 className="font-semibold text-foreground mb-2">Memorable</h3>
              <p className="text-muted-foreground text-sm">Creates unforgettable impressions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Ready to Order Your Perfect Gift?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact us today to discuss your special requirements and create something truly memorable
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold text-lg"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </main>
  )
}
