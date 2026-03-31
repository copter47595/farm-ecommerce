'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'หน้าแรก' },
    { href: '/products', label: 'สินค้า' },
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/contact', label: 'ติดต่อ' },
  ]

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#faf8f3]/95 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(61,59,48,0.15)]' 
          : 'bg-[#faf8f3]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#5d6e45] rounded-2xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(93,110,69,0.25)] group-hover:scale-105 transition-transform duration-200">
                <Leaf className="w-5 h-5 text-[#faf8f3]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#3d3b30] leading-tight">
                  ฟาร์มพึ่งหนุ่ม
                </span>
                <span className="text-xs text-[#5d6e45] font-medium tracking-wide">
                  Organic Farm
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="px-4 py-2 text-[#3d3b30] hover:text-[#5d6e45] hover:bg-[#e8ebe0]/50 rounded-xl transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative w-10 h-10 rounded-xl bg-[#f5f1e8] hover:bg-[#e8ebe0] text-[#3d3b30] hover:text-[#5d6e45] transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={2} />
                {mounted && totalItems > 0 && (
                  <Badge 
                    variant="default"
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-[#c4705a] text-white border-2 border-[#faf8f3]"
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
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-xl bg-[#f5f1e8] hover:bg-[#e8ebe0] text-[#3d3b30]"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-[#e3dcc9]/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-3 text-[#3d3b30] hover:text-[#5d6e45] hover:bg-[#e8ebe0]/50 rounded-xl font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
