import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, Phone, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-700" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ได้รับออเดอร์แล้ว!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            ทีมงานจะตรวจสอบคำสั่งซื้อของคุณภายใน 24 ชั่วโมง
          </p>

          <Card className="border-gray-200 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-2 text-green-700 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-medium">สถานะ: รอตรวจสอบ</span>
              </div>
              
              <p className="text-gray-600 mb-4">
                เราจะส่ง SMS แจ้งเตือนเมื่อยืนยันการชำระเงินและจัดส่งสินค้า
              </p>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 mb-2">หากมีข้อสงสัย ติดต่อเราได้ที่:</p>
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    <span>089-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MessageCircle className="w-4 h-4" />
                    <span>@farmpeangnum</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-green-700 hover:bg-green-800 text-white px-8">
                เลือกซื้อสินค้าเพิ่ม
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 px-8">
                กลับหน้าแรก
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
