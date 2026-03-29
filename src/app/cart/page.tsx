'use client'

import { useCart } from '@/contexts/CartContext'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fdf6ec]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">ตะกร้าของคุณว่างเปล่า</h1>
            <p className="text-gray-600 mb-8">เริ่มช้อปปิ้งสินค้าจากฟาร์มของเรา</p>
            <Link href="/products">
              <Button className="bg-green-700 hover:bg-green-800 text-white px-8">
                ดูสินค้าทั้งหมด
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ตะกร้าสินค้า</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                      <span className="text-green-700 text-xs text-center">ภาพสินค้า</span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name_th}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 rounded-none"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="w-12 text-center font-medium">{item.quantity}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-none"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ฿{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ฿{item.price.toFixed(2)} / ชิ้น
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Link href="/products">
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                ← เลือกซื้อสินค้าเพิ่ม
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200 sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">สรุปคำสั่งซื้อ</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>จำนวนสินค้า ({totalItems} ชิ้น)</span>
                </div>
                
                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">ยอดรวม</span>
                  <span className="text-2xl font-bold text-green-700">
                    ฿{totalPrice.toFixed(2)}
                  </span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white py-3">
                    ดำเนินการชำระเงิน
                  </Button>
                </Link>

                <p className="text-xs text-gray-500 text-center">
                  ค่าจัดส่งจะถูกคำนวณในขั้นตอนถัดไป
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
