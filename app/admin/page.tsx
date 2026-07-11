import { Metadata } from 'next'
import AdminGalleryManager from '@/components/AdminGalleryManager'

export const metadata: Metadata = {
  title: 'Admin | MK Creation Hub Gallery',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminGalleryManager />
}
