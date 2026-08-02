import { Quote, Star } from 'lucide-react'
import { clientReviews } from '@/lib/testimonials'

export default function ClientReviews() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Customer Reviews</span>
          <h2 className="mt-3 text-4xl font-serif font-bold text-foreground">Reviews From Our Customers</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Honest words from customers who trusted us for their special gift arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientReviews.map((review) => (
            <article key={review.id} className="rounded-lg border border-border bg-card p-6 shadow-lg">
              <div className="mb-5 flex items-center justify-between gap-4">
                <Quote className="h-8 w-8 text-primary" />
                <div className="flex gap-1 text-accent" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={`${review.id}-${index}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{review.description}</p>

              <div className="mt-6 border-t border-border pt-5">
                <h3 className="font-semibold text-foreground">{review.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{review.occasion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
