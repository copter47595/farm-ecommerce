'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { useAdmin } from '@/contexts/AdminContext'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAdmin()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated - useEffect to avoid setState during render
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const success = login(password)
    
    if (success) {
      router.push('/admin')
    } else {
      setError('รหัสผ่านไม่ถูกต้อง')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#e3dcc9] shadow-lg bg-white">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="w-16 h-16 bg-[#5d6e45] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">ฟ</span>
          </div>
          
          <h1 className="text-2xl font-bold text-[#3d3b30]">ฟาร์มพึ่งหนุ่ม</h1>
          <p className="text-[#5c5346] mt-1">ระบบจัดการร้านค้า</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-[#5c5346]">
                รหัสผ่าน
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7b53]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  className="pl-10 pr-10 border-[#e3dcc9]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7b53] hover:text-[#5d6e45]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-[#fdf6ec] border border-[#c4705a] rounded-md">
                <p className="text-[#c4705a] text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5d6e45] hover:bg-[#4a5737] text-white py-3"
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-[#5c5346] hover:text-[#5d6e45]">
              ← กลับไปหน้าร้านค้า
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
