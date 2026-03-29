'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ฟ</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ฟาร์มพึ่งหนุ่ม</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              หน้าแรก
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              สินค้า
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              เกี่ยวกับเรา
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              ติดต่อ
            </Link>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
            <Link 
              href="/" 
              className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link 
              href="/products" 
              className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              สินค้า
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              เกี่ยวกับเรา
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              ติดต่อ
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
