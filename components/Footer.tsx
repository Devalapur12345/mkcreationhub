import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <>
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Visit Us</h2>
            <p className="text-muted-foreground">Azam Nagar, Belagavi, Karnataka 590010</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border shadow-lg">
            <iframe
              title="MK Creation Hub location in Azam Nagar, Belagavi"
              src="https://www.google.com/maps?q=Azam%20Nagar,%20Belagavi,%20Karnataka%20590010&output=embed"
              className="h-80 w-full md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="relative w-90 h-90 mb-4">
                <Image
                  src="/mkcreation.svg"
                  alt="MK Creations Hub"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-muted-foreground">Crafting beautiful memories through premium gift packaging for weddings and engagements.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={18} />
                  <a href="tel:+917795440217">7795440217</a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <MapPin size={18} />
                  <span>Azam Nagar Belagavi, Karnataka</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MK Creations Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}



// vercel_blob_rw_62ri6se4nX7rcytY_q70BPSEqfQElnIzpCef8aw5OLu5mrz
