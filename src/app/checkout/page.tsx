'use client'

import { useState, useRef } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Upload, CheckCircle, ShoppingCart, CreditCard, Package, FileText } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const steps = [
  { id: 'cart', label: 'ตะกร้า', icon: ShoppingCart },
  { id: 'info', label: 'ข้อมูล', icon: FileText },
  { id: 'payment', label: 'ชำระเงิน', icon: CreditCard },
  { id: 'complete', label: 'เสร็จสิ้น', icon: Package }
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })
  const [slipFile, setSlipFile] = useState<File | null>(null)
  const [slipPreview, setSlipPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fdf6ec]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#3d3b30] mb-4">ตะกร้าของคุณว่างเปล่า</h1>
            <Link href="/products">
              <Button className="bg-[#5d6e45] hover:bg-[#4a5737] text-white">
                เลือกซื้อสินค้า
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSlipFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSlipPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSlipFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSlipPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อ-นามสกุล'
    if (!formData.phone.trim()) newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์'
    if (!formData.address.trim()) newErrors.address = 'กรุณากรอกที่อยู่จัดส่ง'
    if (!slipFile) newErrors.slip = 'กรุณาอัปโหลดสลิปการโอนเงิน'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Upload slip to Supabase Storage
      let slipUrl = ''
      if (slipFile) {
        const fileName = `slips/${Date.now()}_${slipFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('slips')
          .upload(fileName, slipFile)

        if (uploadError) {
          console.error('Error uploading slip:', uploadError)
          throw new Error('Failed to upload slip')
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('slips')
          .getPublicUrl(fileName)
        
        slipUrl = publicUrl
      }

      // Create order in database
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: JSON.stringify(items),
        total: totalPrice,
        slip_url: slipUrl,
        status: 'รอตรวจสอบ',
        created_at: new Date().toISOString()
      }

      const { error: orderError } = await supabase
        .from('orders')
        .insert([orderData])

      if (orderError) {
        console.error('Error creating order:', orderError)
        throw new Error('Failed to create order')
      }

      // Clear cart and redirect to success
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Error submitting order:', error)
      toast.error('เกิดข้อผิดพลาดในการสั่งซื้อ', {
        description: 'กรุณาลองใหม่อีกครั้ง'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === 'info' || step.id === 'payment'
              const isCompleted = step.id === 'cart'
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isActive ? 'bg-[#5d6e45] text-white' :
                    isCompleted ? 'bg-[#e8e0d0] text-[#5d6e45]' :
                    'bg-[#f5f1e8] text-[#6b6b5e]'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card className="border-gray-200">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">ข้อมูลการจัดส่ง</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อ-นามสกุล"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ที่อยู่จัดส่ง <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="กรอกที่อยู่จัดส่ง"
                    rows={3}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </CardContent>
            </Card>

            {/* PromptPay Payment */}
            <Card className="border-gray-200">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">ชำระเงินด้วย PromptPay</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Total Amount */}
                <div className="bg-[#f5f1e8] p-4 rounded-lg text-center">
                  <p className="text-[#5c5346] mb-1">ยอดที่ต้องชำระ</p>
                  <p className="text-3xl font-bold text-[#5d6e45]">
                    ฿{totalPrice.toFixed(2)}
                  </p>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
                    <div className="text-center p-4">
                      <p className="text-gray-500 mb-2">QR Code PromptPay</p>
                      <p className="text-sm text-gray-400">วางรูป qr-promptpay.png ในโฟลเดอร์ public</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-medium text-gray-900">ฟาร์มพึ่งหนุ่ม</p>
                    <p className="text-gray-600">PromptPay: 089-123-4567</p>
                  </div>
                </div>

                {/* Slip Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อัปโหลดสลิปการโอน <span className="text-red-500">*</span>
                  </label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      errors.slip ? 'border-red-500 bg-red-50' :
                      slipPreview ? 'border-[#5d6e45] bg-[#e8ebe0]' :
                      'border-[#e3dcc9] hover:border-[#5d6e45] hover:bg-[#f5f1e8]'
                    }`}
                  >
                    {slipPreview ? (
                      <div className="space-y-2">
                        <img src={slipPreview} alt="Slip preview" className="max-h-48 mx-auto rounded" />
                        <p className="text-[#5d6e45] font-medium">{slipFile?.name}</p>
                        <p className="text-sm text-[#5c5346]">คลิกเพื่อเปลี่ยนรูป</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 text-[#b3bfa0] mx-auto" />
                        <p className="text-[#5c5346]">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                        <p className="text-sm text-[#6b6b5e]">รองรับไฟล์รูปภาพ JPG, PNG</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {errors.slip && <p className="text-red-500 text-sm mt-1">{errors.slip}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200 sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">สรุปคำสั่งซื้อ</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name_th}</p>
                        <p className="text-gray-500">x{item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ฿{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#3d3b30]">ยอดรวม</span>
                  <span className="text-2xl font-bold text-[#5d6e45]">
                    ฿{totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#5d6e45] hover:bg-[#4a5737] text-white py-3"
                >
                  {isSubmitting ? (
                    'กำลังประมวลผล...'
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      ยืนยันการสั่งซื้อ
                    </>
                  )}
                </Button>

                <Link href="/cart">
                  <Button variant="outline" className="w-full border-gray-300">
                    กลับไปตะกร้า
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
