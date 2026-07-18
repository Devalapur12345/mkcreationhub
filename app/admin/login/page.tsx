import { Metadata } from 'next'
import AdminGalleryManager from '@/components/AdminGalleryManager'

export const metadata: Metadata = {
  title: 'Admin Login | MK Creation Hub Gallery',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginPage() {
  return <AdminGalleryManager />
}
