import { AdminProvider } from '@/contexts/AdminContext'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}
