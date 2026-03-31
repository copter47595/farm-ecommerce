'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/contexts/AdminContext'
import { useState } from 'react'

const sidebarItems = [
  { id: 'dashboard', label: 'ภาพรวม', href: '/admin', icon: LayoutDashboard },
  { id: 'orders', label: 'ออเดอร์', href: '/admin/orders', icon: ShoppingBag },
  { id: 'products', label: 'สินค้า', href: '/admin/products', icon: Package },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAdmin()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fdf6ec] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-[#e3dcc9] bg-white">
        {/* Logo */}
        <div className="p-6 border-b border-[#e3dcc9]">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#5d6e45] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">ฟ</span>
            </div>
            <div>
              <h1 className="font-bold text-[#3d3b30]">ฟาร์มพึ่งหนุ่ม</h1>
              <p className="text-xs text-[#6b6b5e]">ระบบจัดการ</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#5d6e45] text-white'
                    : 'text-[#5c5346] hover:bg-[#e8e0d0] hover:text-[#5d6e45]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#e3dcc9]">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-[#c4705a] hover:bg-[#fdf6ec] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e3dcc9]">
        <div className="flex items-center justify-between p-4">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#5d6e45] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ฟ</span>
            </div>
            <span className="font-bold text-[#3d3b30]">ฟาร์มพึ่งหนุ่ม</span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#5d6e45]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-[#e3dcc9] p-4 space-y-2 bg-[#fdf6ec]">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#5d6e45] text-white'
                      : 'text-[#5c5346] hover:bg-[#e8e0d0] hover:text-[#5d6e45]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                logout()
              }}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-[#c4705a] hover:bg-[#fdf6ec] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="md:p-8 pt-20 md:pt-8 p-4">
          {children}
        </div>
      </main>
    </div>
  )
}
