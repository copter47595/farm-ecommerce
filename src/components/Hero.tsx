import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Option 1: ใช้รูปจากโฟลเดอร์ public */}
        {/* <Image
          src="/images/hero-bg.jpg"
          alt="Farm background"
          fill
          className="object-cover"
          priority
        /> */}
        
        {/* Option 2: ใช้รูปจาก Supabase Storage */}
        {/* <Image
          src="https://your-project.supabase.co/storage/v1/object/public/products/hero-bg.jpg"
          alt="Farm background"
          fill
          className="object-cover"
          priority
        /> */}
        
        {/* Option 3: ใช้รูปจาก URL ภายนอก - ACTIVE */}
        <Image
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
          alt="Beautiful green farm field"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay - ทำให้ข้อความอ่านง่ายขึ้น (เข้มขึ้นเพื่อให้เห็นตัวหนังสือชัด) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            ของดีจากฟาร์ม<br />
            <span className="text-green-400">ส่งตรงถึงบ้าน</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            สินค้าคุณภาพจากฟาร์มของเรา สดใหม่ทุกวัน ปลอดภัย และเชื่อถือได้
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg transition-all hover:scale-105"
              >
                ดูสินค้าทั้งหมด
              </Button>
            </Link>
            
            <Link href="/about">
              <Button 
                size="lg"
                className="bg-white/90 hover:bg-white text-green-700 px-8 py-4 text-lg font-medium rounded-full shadow-lg transition-all hover:scale-105 border-2 border-white"
              >
                เกี่ยวกับเรา
              </Button>
            </Link>
          </div>

          {/* Trust indicators - Feature Cards with glass effect */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">สินค้าคุณภาพ</h3>
              <p className="text-gray-700 text-sm font-medium">ผ่านการคัดสรรอย่างดี</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">ส่งเร็วทันใจ</h3>
              <p className="text-gray-700 text-sm font-medium">จัดส่งภายใน 24 ชั่วโมง</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">เลี้ยงใจฟาร์ม</h3>
              <p className="text-gray-700 text-sm font-medium">สนับสนุนเกษตรกรท้องถิ่น</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
