export type TestimonialImage = {
  id: string
  src: string
  title: string
  description: string
  isCustom?: boolean
}

export type ClientReview = {
  id: string
  name: string
  occasion: string
  rating: number
  description: string
}

export const clientReviews: ClientReview[] = [
  {
    id: 'wedding-gift-review',
    name: 'Ayesha Khan',
    occasion: 'Wedding Gift Packing',
    rating: 5,
    description:
      'The gift trays looked premium and elegant. Every detail was neat, and the final presentation was exactly what we wanted for the wedding.',
  },
  {
    id: 'engagement-review',
    name: 'Sameer Patel',
    occasion: 'Engagement Arrangement',
    rating: 5,
    description:
      'Beautiful decoration, fresh flowers, and very good finishing. The arrangement made our engagement gifts look special and memorable.',
  },
  {
    id: 'baby-gift-review',
    name: 'Nida Shaikh',
    occasion: 'Baby Gift Hamper',
    rating: 5,
    description:
      'The baby hamper was arranged with care and looked lovely. The colors, wrapping, and small details were all done very nicely.',
  },
]
