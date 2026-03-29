import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-cover bg-center bg-no-repeat relative">
          {/* Placeholder for hero background image */}
          <div className="w-full h-full bg-gradient-to-r from-green-900/20 to-green-700/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ของดีจากฟาร์ม<br />
            <span className="text-green-700">ส่งตรงถึงบ้าน</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            สินค้าคุณภาพจากฟาร์มของเรา สดใหม่ทุกวัน ปลอดภัย และเชื่อถือได้
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-md transition-colors"
              >
                ดูสินค้าทั้งหมด
              </Button>
            </Link>
            
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-medium rounded-md transition-colors"
              >
                เกี่ยวกับเรา
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">สินค้าคุณภาพ</h3>
              <p className="text-gray-600 text-sm">ผ่านการคัดสรรอย่างดี</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ส่งเร็วทันใจ</h3>
              <p className="text-gray-600 text-sm">จัดส่งภายใน 24 ชั่วโมง</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">เลี้ยงใจฟาร์ม</h3>
              <p className="text-gray-600 text-sm">สนับสนุนเกษตรกรท้องถิ่น</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
