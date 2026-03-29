'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// Admin password from environment variable
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'farmpeangnum2024'

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage on first render
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminSession') === 'true'
    }
    return false
  })
  const router = useRouter()

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('adminSession', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminSession')
    router.push('/admin/login')
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [mounted, isAuthenticated, router])

  // Prevent hydration mismatch - render loading state until mounted
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
      </div>
    )
  }

  return <>{children}</>
}
