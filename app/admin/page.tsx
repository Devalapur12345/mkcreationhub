import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AdminGalleryManager from '@/components/AdminGalleryManager'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export const metadata: Metadata = {
  title: 'Admin | MK Creation Hub Gallery',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  return <AdminGalleryManager />
}
