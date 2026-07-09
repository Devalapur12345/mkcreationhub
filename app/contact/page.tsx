import { Metadata } from 'next'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'

const phoneNumber = '+91 7795440217'
const phoneHref = 'tel:+917795440217'
const whatsappHref = 'https://wa.me/917795440217'

export const metadata: Metadata = {
  title: 'Contact | Premium Gift Packaging in Belagavi - +91 7795440217',
  description:
    'Call MD Creation Hub for custom wedding and engagement gift arrangements in Belagavi. Premium gift packaging, floral decorations, and luxury arrangements.',
  keywords: ['contact us', 'gift order', 'wedding gifts', 'engagement gifts', 'Belagavi contact', 'order gifts'],
  openGraph: {
    title: 'Contact MD Creation Hub - Call for Gift Orders',
    description: 'Call or WhatsApp us for custom gift arrangements in Belagavi.',
    url: 'https://MD Creation Hub-gifts.com/contact',
  },
}

export default function Contact() {
  return (
    <main className="bg-background">
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For gift orders, custom decorations, and package details, please contact us directly on the number below.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-lg p-8 md:p-10 shadow-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Want to contact us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Call or WhatsApp this number and we will help you with your order.
            </p>

            <a
              href={phoneHref}
              className="block text-3xl md:text-5xl font-serif font-bold text-primary hover:text-accent transition-colors mb-8 break-words"
            >
              {phoneNumber}
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">Azam Nager</p>
                  <p className="text-muted-foreground">Belagavi, Karnataka</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Working Hours</h3>
                  <p className="text-muted-foreground">Monday - Saturday</p>
                  <p className="text-muted-foreground">10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
