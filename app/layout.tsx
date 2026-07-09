import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'MD Creation Hub - Premium Wedding & Engagement Gift Packaging | Belagavi',
  description: 'Premium wedding and engagement gift packaging in Belagavi. Beautifully crafted arrangements with flowers, chocolates, and luxury decorations. Call +91 7795440217',
  keywords: ['wedding gifts', 'engagement gifts', 'gift packaging', 'Belagavi', 'wedding arrangements', 'luxury gifts', 'gift decoration'],
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://MD Creation Hub-gifts.com',
    title: 'MD Creation Hub - Premium Wedding & Engagement Gift Packaging',
    description: 'Beautifully crafted wedding and engagement gift arrangements in Belagavi',
    siteName: 'MD Creation Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD Creation Hub - Premium Wedding & Engagement Gift Packaging',
    description: 'Beautifully crafted wedding and engagement gift arrangements',
  },
  authors: [{ name: 'MD Creation Hub' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f1eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1410' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MD Creation Hub - Premium Gift Packaging',
    description: 'Premium wedding and engagement gift packaging service in Belagavi',
    telephone: '+917795440217',
    email: 'contact@MD Creation Hub-gifts.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Azam Nager',
      addressLocality: 'Belagavi',
      addressRegion: 'Karnataka',
      postalCode: '590001',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
    url: 'https://MD Creation Hub-gifts.com',
  }

  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <Navigation />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
